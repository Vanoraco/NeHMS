import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineStockHospitalComponent } from './medicine-stock-hospital.component';

describe('MedicineStockHospitalComponent', () => {
  let component: MedicineStockHospitalComponent;
  let fixture: ComponentFixture<MedicineStockHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineStockHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineStockHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
