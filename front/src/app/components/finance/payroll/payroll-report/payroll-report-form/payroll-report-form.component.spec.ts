import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollReportFormComponent } from './payroll-report-form.component';

describe('PayrollReportFormComponent', () => {
  let component: PayrollReportFormComponent;
  let fixture: ComponentFixture<PayrollReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollReportFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
