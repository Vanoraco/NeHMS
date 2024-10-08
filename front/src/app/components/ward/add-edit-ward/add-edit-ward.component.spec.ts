import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWardComponent } from './add-edit-ward.component';

describe('AddEditWardComponent', () => {
  let component: AddEditWardComponent;
  let fixture: ComponentFixture<AddEditWardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
