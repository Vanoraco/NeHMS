import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeSalaryComponent } from './employe-salary.component';

describe('EmployeSalaryComponent', () => {
  let component: EmployeSalaryComponent;
  let fixture: ComponentFixture<EmployeSalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeSalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
