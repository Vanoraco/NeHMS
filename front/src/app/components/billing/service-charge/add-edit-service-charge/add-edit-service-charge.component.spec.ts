import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServiceChargeComponent } from './add-edit-service-charge.component';

describe('AddEditServiceChargeComponent', () => {
  let component: AddEditServiceChargeComponent;
  let fixture: ComponentFixture<AddEditServiceChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditServiceChargeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditServiceChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
