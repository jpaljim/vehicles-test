import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MakeListComponent } from '@components/index';
import { VehicleMakesStore } from '@stores/vehicle-makes.store';

@Component({
  selector: 'app-make-list-page',
  standalone: true,
  imports: [
    JsonPipe,
    MakeListComponent,
  ],
  templateUrl: './make-list.component.html',
  styleUrl: './make-list.component.scss',
  providers: [VehicleMakesStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeListPageComponent implements OnInit {

  readonly vehicleMakesStore = inject(VehicleMakesStore);

  ngOnInit(): void {
    this.vehicleMakesStore.loadMakes();
  }

}