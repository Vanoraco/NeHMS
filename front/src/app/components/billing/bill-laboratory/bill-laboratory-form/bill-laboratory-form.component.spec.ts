import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillLaboratoryFormComponent } from './bill-laboratory-form.component';

describe('BillLaboratoryFormComponent', () => {
  let component: BillLaboratoryFormComponent;
  let fixture: ComponentFixture<BillLaboratoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillLaboratoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillLaboratoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
