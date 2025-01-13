import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MakeModel } from '@models/make-model';

@Component({
  selector: 'app-make-model-list',
  standalone: true,
  imports: [
    MatListModule,
    ScrollingModule,
  ],
  templateUrl: './make-model-list.component.html',
  styleUrl: './make-model-list.component.scss'
})
export class MakeModelListComponent {

  @Input({ required: true }) makeModels: MakeModel[] = [];

}
