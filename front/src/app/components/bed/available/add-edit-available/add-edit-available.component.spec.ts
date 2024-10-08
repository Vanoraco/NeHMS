import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAvailableComponent } from './add-edit-available.component';

describe('AddEditAvailableComponent', () => {
  let component: AddEditAvailableComponent;
  let fixture: ComponentFixture<AddEditAvailableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAvailableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAvailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
