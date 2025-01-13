import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { MakeDetailsPageComponent } from './make-details.component';

describe('MakeDetailsPageComponent', () => {
  let component: MakeDetailsPageComponent;
  let fixture: ComponentFixture<MakeDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeDetailsPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(),
        provideRouter(routes),
        provideZoneChangeDetection({ eventCoalescing: true }),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MakeDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
