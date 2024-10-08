import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEducationlevelComponent } from './add-edit-educationlevel.component';

describe('AddEditEducationlevelComponent', () => {
  let component: AddEditEducationlevelComponent;
  let fixture: ComponentFixture<AddEditEducationlevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditEducationlevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditEducationlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
