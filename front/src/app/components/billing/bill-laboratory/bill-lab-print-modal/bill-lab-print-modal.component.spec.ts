import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLabPrintModalComponent } from './bill-lab-print-modal.component';

describe('BillLabPrintModalComponent', () => {
  let component: BillLabPrintModalComponent;
  let fixture: ComponentFixture<BillLabPrintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillLabPrintModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillLabPrintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
