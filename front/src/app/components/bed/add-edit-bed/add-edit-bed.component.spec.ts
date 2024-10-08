import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBedComponent } from './add-edit-bed.component';

describe('AddEditBedComponent', () => {
  let component: AddEditBedComponent;
  let fixture: ComponentFixture<AddEditBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
