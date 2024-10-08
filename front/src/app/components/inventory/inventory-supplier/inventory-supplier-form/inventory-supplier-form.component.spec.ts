import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySupplierFormComponent } from './inventory-supplier-form.component';

describe('InventorySupplierFormComponent', () => {
  let component: InventorySupplierFormComponent;
  let fixture: ComponentFixture<InventorySupplierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySupplierFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
