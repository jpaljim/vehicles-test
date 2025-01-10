import { inject } from '@angular/core';
import { Make } from '@models/make';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from '@services/vehicles.service';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

interface VehicleMakesState {
  filter: { query: string; };
  isLoading: boolean;
  makes: Make[];
};

const initialState: VehicleMakesState = {
  filter: { query: '' },
  isLoading: false,
  makes: [],
};

export const VehicleMakesStore = signalStore(
  withState(initialState),
  withMethods((store, vehiclesService = inject(VehiclesService)) => ({
    updateQuery(query: string): void {
      patchState(store, (state) => (
        {
          filter: {
            ...state.filter, query
          },
        }
      ));
    },
    loadMakes: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return vehiclesService.getAllMakes().pipe(
            tapResponse({
              next: (makes) => patchState(store, { makes, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  }))
);