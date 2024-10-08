import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDonorComponent } from './add-edit-donor.component';

describe('AddEditDonorComponent', () => {
  let component: AddEditDonorComponent;
  let fixture: ComponentFixture<AddEditDonorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDonorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
