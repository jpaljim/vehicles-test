import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeModelListComponent } from './make-model-list.component';

describe('MakeModelListComponent', () => {
  let component: MakeModelListComponent;
  let fixture: ComponentFixture<MakeModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeModelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
