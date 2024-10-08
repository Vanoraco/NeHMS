import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBirthComponent } from './add-edit-birth.component';

describe('AddEditBirthComponent', () => {
  let component: AddEditBirthComponent;
  let fixture: ComponentFixture<AddEditBirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBirthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
