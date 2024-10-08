import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryTestCategoryFormComponent } from './laboratory-test-category-form.component';

describe('LaboratoryTestCategoryFormComponent', () => {
  let component: LaboratoryTestCategoryFormComponent;
  let fixture: ComponentFixture<LaboratoryTestCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryTestCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryTestCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
