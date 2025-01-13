import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeTypeListComponent } from './make-type-list.component';

describe('MakeTypeListComponent', () => {
  let component: MakeTypeListComponent;
  let fixture: ComponentFixture<MakeTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MakeTypeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
