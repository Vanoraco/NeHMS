import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDeathComponent } from './add-edit-death.component';

describe('AddEditDeathComponent', () => {
  let component: AddEditDeathComponent;
  let fixture: ComponentFixture<AddEditDeathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDeathComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
