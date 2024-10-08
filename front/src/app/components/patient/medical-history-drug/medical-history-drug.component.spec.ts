import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalHistoryDrugComponent } from './medical-history-drug.component';

describe('MedicalHistoryDrugComponent', () => {
  let component: MedicalHistoryDrugComponent;
  let fixture: ComponentFixture<MedicalHistoryDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalHistoryDrugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
