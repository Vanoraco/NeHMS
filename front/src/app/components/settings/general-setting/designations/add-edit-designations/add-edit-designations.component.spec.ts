import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDesignationsComponent } from './add-edit-designations.component';

describe('AddEditDesignationsComponent', () => {
  let component: AddEditDesignationsComponent;
  let fixture: ComponentFixture<AddEditDesignationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDesignationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
