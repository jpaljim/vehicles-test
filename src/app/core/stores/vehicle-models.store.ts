import { inject } from '@angular/core';
import { MakeModel } from '@models/make-model';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { VehiclesService } from '@services/vehicles.service';
import { of, pipe, switchMap, tap } from 'rxjs';

interface VehicleModelsState {
  currentModels: MakeModel[];
  initialLoad: Map<number, boolean>;
  isLoading: boolean;
  modelsMap: Map<number, MakeModel[]>;
};

const initialState: VehicleModelsState = {
  currentModels: [],
  initialLoad: new Map<number, boolean>(),
  isLoading: false,
  modelsMap: new Map<number, MakeModel[]>(),
};

export const VehicleModelsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, vehiclesService = inject(VehiclesService)) => ({
    loadModels: rxMethod<number>(
      pipe(
        tap((makeId) => {
          if (store.initialLoad().get(makeId)) return;
          patchState(store, { isLoading: true });
        }),
        switchMap((makeId) => {
          if (store.initialLoad().get(makeId)) {
            return of(store.modelsMap().get(makeId));
          }
          return vehiclesService.getModelsByMakeId(makeId).pipe(
            tapResponse({
              next: (response) => {
                const newModels = store.modelsMap().set(makeId, response.Results);
                const newInitialLoad = store.initialLoad().set(makeId, true);
                patchState(store, { modelsMap: newModels, currentModels: response.Results, isLoading: false, initialLoad: newInitialLoad })

                return store.currentModels();
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