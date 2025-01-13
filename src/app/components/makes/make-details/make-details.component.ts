import { Component, Input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MakeModel } from '@models/make-model';
import { MakeType } from '@models/make-type';
import { MakeModelListComponent } from '../make-model-list/make-model-list.component';
import { MakeTypeListComponent } from '../make-type-list/make-type-list.component';

@Component({
  selector: 'app-make-details',
  standalone: true,
  imports: [
    MakeModelListComponent,
    MakeTypeListComponent,
    MatProgressSpinner,
  ],
  templateUrl: './make-details.component.html',
  styleUrl: './make-details.component.scss'
})
export class MakeDetailsComponent {

  @Input({ required: true }) makeTypes: MakeType[] = [];
  @Input({ required: true }) makeModels: MakeModel[] = [];
  @Input({ required: true }) loadingTypes = false;
  @Input({ required: true }) loadingModels = false;

}
