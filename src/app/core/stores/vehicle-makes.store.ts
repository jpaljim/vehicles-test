import { inject } from '@angular/core';
import { Make } from '@models/make';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from '@services/vehicles.service';
import { of, pipe, switchMap, tap } from 'rxjs';

interface VehicleMakesState {
  initialLoad: boolean;
  isLoading: boolean;
  makes: Make[];
};

const initialState: VehicleMakesState = {
  initialLoad: false,
  isLoading: false,
  makes: [],
};

export const VehicleMakesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, vehiclesService = inject(VehiclesService)) => ({
    loadMakes: rxMethod<void>(
      pipe(
        tap(() => {
          if (store.initialLoad()) return;
          patchState(store, { isLoading: true });
        }),
        switchMap(() => {
          if (store.initialLoad()) {
            return of(store.makes);
          }
          return vehiclesService.getAllMakes().pipe(
            tapResponse({
              next: (response) => patchState(store, { makes: response.Results, isLoading: false, initialLoad: true }),
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