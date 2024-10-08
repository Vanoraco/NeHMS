import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBedtypeComponent } from './add-edit-bedtype.component';

describe('AddEditBedtypeComponent', () => {
  let component: AddEditBedtypeComponent;
  let fixture: ComponentFixture<AddEditBedtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditBedtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBedtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
