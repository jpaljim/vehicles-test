import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MakeListPageComponent } from './make-list.component';

describe('MakeListPageComponent', () => {
  let component: MakeListPageComponent;
  let fixture: ComponentFixture<MakeListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeListPageComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MakeListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
