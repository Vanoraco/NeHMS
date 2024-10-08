import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineSupplierComponent } from './medicine-supplier.component';

describe('MedicineSupplierComponent', () => {
  let component: MedicineSupplierComponent;
  let fixture: ComponentFixture<MedicineSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineSupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
