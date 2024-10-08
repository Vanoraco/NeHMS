import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryTestCategoryComponent } from './laboratory-test-category.component';

describe('LaboratoryTestCategoryComponent', () => {
  let component: LaboratoryTestCategoryComponent;
  let fixture: ComponentFixture<LaboratoryTestCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryTestCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboratoryTestCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
