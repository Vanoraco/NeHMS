import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAllergyComponent } from './add-edit-allergy.component';

describe('AddEditAllergyComponent', () => {
  let component: AddEditAllergyComponent;
  let fixture: ComponentFixture<AddEditAllergyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAllergyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAllergyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
