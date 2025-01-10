import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDetailsComponent } from './make-details.component';

describe('MakeDetailsComponent', () => {
  let component: MakeDetailsComponent;
  let fixture: ComponentFixture<MakeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
