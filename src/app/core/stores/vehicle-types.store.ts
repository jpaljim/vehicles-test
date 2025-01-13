import { inject } from '@angular/core';
import { MakeType } from '@models/make-type';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from '@services/vehicles.service';
import { of, pipe, switchMap, tap } from 'rxjs';

interface VehicleTypesState {
  currentTypes: MakeType[];
  initialLoad: Map<number, boolean>;
  isLoading: boolean;
  typesMap: Map<number, MakeType[]>;
};

// Initial state definition
const initialState: VehicleTypesState = {
  currentTypes: [],
  initialLoad: new Map<number, boolean>(),
  isLoading: false,
  typesMap: new Map<number, MakeType[]>(),
};
// VehicleTypesStore definition
export const VehicleTypesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, vehiclesService = inject(VehiclesService)) => ({
    loadTypes: rxMethod<number>(
      pipe(
        tap((makeId) => {
          // Check if the types for the given makeId have already been loaded
          if (store.initialLoad().get(makeId)) return;
          patchState(store, { isLoading: true });
        }),
        switchMap((makeId) => {
          // If types are already loaded, use them from the store
          if (store.initialLoad().get(makeId)) {
            const currentTypes = store.typesMap().get(makeId);
            patchState(store, { currentTypes });
            return of(currentTypes);
          }
          // Otherwise, fetch types from the service
          return vehiclesService.getTypesByMakeId(makeId).pipe(
            tapResponse({
              next: (response) => {
                // Update the store with the new types and mark as loaded
                const newTypes = store.typesMap().set(makeId, response.Results);
                const newInitialLoad = store.initialLoad().set(makeId, true);
                patchState(store, {
                  typesMap: newTypes,
                  currentTypes: response.Results,
                  isLoading: false,
                  initialLoad: newInitialLoad
                });
                return store.currentTypes();
              },
              error: (err) => {
                // Handle errors and stop loading
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