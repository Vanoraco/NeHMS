import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyMedStockComponent } from './pharmacy-med-stock.component';

describe('PharmacyMedStockComponent', () => {
  let component: PharmacyMedStockComponent;
  let fixture: ComponentFixture<PharmacyMedStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyMedStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyMedStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
