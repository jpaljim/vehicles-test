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

const initialState: VehicleTypesState = {
  currentTypes: [],
  initialLoad: new Map<number, boolean>(),
  isLoading: false,
  typesMap: new Map<number, MakeType[]>(),
};

export const VehicleTypesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, vehiclesService = inject(VehiclesService)) => ({
    loadTypes: rxMethod<number>(
      pipe(
        tap((makeId) => {
          if (store.initialLoad().get(makeId)) return;
          patchState(store, { isLoading: true });
        }),
        switchMap((makeId) => {
          if (store.initialLoad().get(makeId)) {
            return of(store.typesMap().get(makeId));
          }
          return vehiclesService.getTypesByMakeId(makeId).pipe(
            tapResponse({
              next: (response) => {
                const newTypes = store.typesMap().set(makeId, response.Results);
                const newInitialLoad = store.initialLoad().set(makeId, true);
                patchState(store, { typesMap: newTypes, currentTypes: response.Results, isLoading: false, initialLoad: newInitialLoad })
                
                return store.currentTypes();
              },
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