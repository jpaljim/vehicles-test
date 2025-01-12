import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Make } from '@models/make';

@Component({
  selector: 'app-make-list',
  standalone: true,
  imports: [
    MatListModule,
    ScrollingModule,
  ],
  templateUrl: './make-list.component.html',
  styleUrl: './make-list.component.scss'
})
export class MakeListComponent {

  @Input({ required: true }) makes: Make[] = [];

  @Output() clickEvent = new EventEmitter<Make>();

  click(make: Make): void {
    this.clickEvent.emit(make);
  }

}
