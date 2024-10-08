import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyMedstockFormComponent } from './pharmacy-medstock-form.component';

describe('PharmacyMedstockFormComponent', () => {
  let component: PharmacyMedstockFormComponent;
  let fixture: ComponentFixture<PharmacyMedstockFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyMedstockFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyMedstockFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
