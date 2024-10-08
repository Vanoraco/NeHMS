import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMedicalHistoryFamilyComponent } from './add-edit-medical-history-family.component';

describe('AddEditMedicalHistoryFamilyComponent', () => {
  let component: AddEditMedicalHistoryFamilyComponent;
  let fixture: ComponentFixture<AddEditMedicalHistoryFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMedicalHistoryFamilyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMedicalHistoryFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
