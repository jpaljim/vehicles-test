import { inject } from '@angular/core';
import { Make } from '@models/make';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from '@services/vehicles.service';
import { pipe, switchMap, tap } from 'rxjs';

interface VehicleMakesState {
  isLoading: boolean;
  makes: Make[];
};

const initialState: VehicleMakesState = {
  isLoading: false,
  makes: [],
};

export const VehicleMakesStore = signalStore(
  withState(initialState),
  withMethods((store, vehiclesService = inject(VehiclesService)) => ({
    loadMakes: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return vehiclesService.getAllMakes().pipe(
            tapResponse({
              next: (response) => patchState(store, { makes: response.Results, isLoading: false }),
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