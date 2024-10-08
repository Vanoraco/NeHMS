import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyExpenseCategoryComponent } from './pharmacy-expense-category.component';

describe('PharmacyExpenseCategoryComponent', () => {
  let component: PharmacyExpenseCategoryComponent;
  let fixture: ComponentFixture<PharmacyExpenseCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PharmacyExpenseCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyExpenseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
