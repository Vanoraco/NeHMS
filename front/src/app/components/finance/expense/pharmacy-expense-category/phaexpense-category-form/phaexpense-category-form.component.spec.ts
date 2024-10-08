import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaexpenseCategoryFormComponent } from './phaexpense-category-form.component';

describe('PhaexpenseCategoryFormComponent', () => {
  let component: PhaexpenseCategoryFormComponent;
  let fixture: ComponentFixture<PhaexpenseCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaexpenseCategoryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaexpenseCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
