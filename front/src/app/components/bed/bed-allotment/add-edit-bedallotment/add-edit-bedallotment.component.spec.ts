import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBedallotmentComponent } from './add-edit-bedallotment.component';

describe('AddEditBedallotmentComponent', () => {
  let component: AddEditBedallotmentComponent;
  let fixture: ComponentFixture<AddEditBedallotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBedallotmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBedallotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
