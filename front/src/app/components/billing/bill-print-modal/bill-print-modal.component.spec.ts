import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPrintModalComponent } from './bill-print-modal.component';

describe('BillPrintModalComponent', () => {
  let component: BillPrintModalComponent;
  let fixture: ComponentFixture<BillPrintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillPrintModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillPrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
