import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MakeListComponent } from '@components/index';
import { FilterPipe } from '@pipes/filter.pipe';
import { VehicleMakesStore } from '@stores/vehicle-makes.store';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-make-list-page',
  standalone: true,
  imports: [
    FilterPipe,
    MakeListComponent,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './make-list.component.html',
  styleUrl: './make-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MakeListPageComponent implements OnInit, OnDestroy {

  readonly vehicleMakesStore = inject(VehicleMakesStore);
  form: FormGroup;
  query = signal('');

  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _querySub?: Subscription;

  constructor() {
    this.form = this._formBuilder.group({
      query: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.vehicleMakesStore.loadMakes();
    this._querySub = this.form.get('query')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((query) => this.query.set(query))
  }

  ngOnDestroy(): void {
    if (this._querySub) this._querySub.unsubscribe();
  }

  navigateToMakeDetails(makeId: number): void {
    this._router.navigate(['/makes', makeId]);
  }

}