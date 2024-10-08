import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineStockHospitalFormComponent } from './medicine-stock-hospital-form.component';

describe('MedicineStockHospitalFormComponent', () => {
  let component: MedicineStockHospitalFormComponent;
  let fixture: ComponentFixture<MedicineStockHospitalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineStockHospitalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineStockHospitalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
