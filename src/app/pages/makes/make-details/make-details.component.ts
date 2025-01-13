import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleModelsStore } from '@stores/vehicle-models.store';
import { VehicleTypesStore } from '@stores/vehicle-types.store';
import { MakeDetailsComponent } from "../../../components/makes/make-details/make-details.component";

@Component({
  selector: 'app-make-details-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MakeDetailsComponent,
  ],
  templateUrl: './make-details.component.html',
  styleUrl: './make-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeDetailsPageComponent implements OnInit {

  vehicleTypesStore = inject(VehicleTypesStore);
  vehicleModelsStore = inject(VehicleModelsStore);

  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('slug');

    if (!id) return;
    this.vehicleTypesStore.loadTypes(+id);
    this.vehicleModelsStore.loadModels(+id);
  }

  navigateBackToList() {
    this._router.navigate(['/makes']);
  }

}
