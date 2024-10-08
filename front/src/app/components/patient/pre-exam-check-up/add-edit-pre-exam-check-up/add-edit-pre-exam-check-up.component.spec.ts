import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPreExamCheckUpComponent } from './add-edit-pre-exam-check-up.component';

describe('AddEditPreExamCheckUpComponent', () => {
  let component: AddEditPreExamCheckUpComponent;
  let fixture: ComponentFixture<AddEditPreExamCheckUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditPreExamCheckUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditPreExamCheckUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
