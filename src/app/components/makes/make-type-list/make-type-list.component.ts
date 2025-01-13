import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, Input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MakeType } from '@models/make-type';

@Component({
  selector: 'app-make-type-list',
  standalone: true,
  imports: [
    MatListModule,
    ScrollingModule,
  ],
  templateUrl: './make-type-list.component.html',
  styleUrl: './make-type-list.component.scss'
})
export class MakeTypeListComponent {

  @Input({ required: true }) makeTypes: MakeType[] = [];

}
