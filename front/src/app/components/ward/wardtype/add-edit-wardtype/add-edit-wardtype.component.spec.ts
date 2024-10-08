import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWardtypeComponent } from './add-edit-wardtype.component';

describe('AddEditWardtypeComponent', () => {
  let component: AddEditWardtypeComponent;
  let fixture: ComponentFixture<AddEditWardtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditWardtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWardtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
