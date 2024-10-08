import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLaboratoryComponent } from './bill-laboratory.component';

describe('BillLaboratoryComponent', () => {
  let component: BillLaboratoryComponent;
  let fixture: ComponentFixture<BillLaboratoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillLaboratoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillLaboratoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
