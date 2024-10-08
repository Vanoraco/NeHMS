import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDrugFormComponent } from './medical-history-drug-form.component';

describe('MedicalHistoryDrugFormComponent', () => {
  let component: MedicalHistoryDrugFormComponent;
  let fixture: ComponentFixture<MedicalHistoryDrugFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryDrugFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryDrugFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
