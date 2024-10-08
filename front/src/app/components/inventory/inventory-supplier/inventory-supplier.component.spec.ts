import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySupplierComponent } from './inventory-supplier.component';

describe('InventorySupplierComponent', () => {
  let component: InventorySupplierComponent;
  let fixture: ComponentFixture<InventorySupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventorySupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventorySupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
