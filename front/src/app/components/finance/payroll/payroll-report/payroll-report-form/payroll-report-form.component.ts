import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-payroll-report-form',
  templateUrl: './payroll-report-form.component.html',
  styleUrls: ['./payroll-report-form.component.css'],
})
export class PayrollReportFormComponent implements OnInit {
  payrollReportList$: any;
  employeeList$: any;
  employeeSalaryList$: any = [];
  taxRuleList$: any = [];
  allowanceDeduction$: any = [];

  constructor(
    private payrollReportService: BillingService,
    private employeeService: EmployeeService,
    private settingService: SettingService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  @Input() payrollReportList: any;
  id: number = 0;
  baseSalary: number = 0;
  employeeId: number = 0;
  employeeSalaryId: number = 0;
  date: string = '';
  month: string = '';
  year: string = '';

  ngOnInit(): void {
    this.id = this.payrollReportList.id;
    this.baseSalary = this.payrollReportList.baseSalary;
    this.employeeId = this.payrollReportList.employeeId;
    this.employeeSalaryId = this.payrollReportList.employeeSalaryId;
    this.date = this.payrollReportList.date;
    this.month = this.payrollReportList.month;
    this.year = this.payrollReportList.year;
    this.payrollReportList$ = this.payrollReportService.getPayrollReportApi();
    this.getEmployee();
    this.getEmployeeSalary();
    this.getTaxRule();
  }
  getEmployee() {
    this.employeeService.getEmployeeApi().subscribe((response) => {
      this.employeeList$ = response;
    });
  }

  getEmployeeSalary() {
    this.employeeService.getEmployeeSalaryApi().subscribe((response) => {
      this.employeeSalaryList$ = response;
    });
  }

  grossSalary: number = 0;
  salayId: number = 0;
  salaryIncomeTax: number = 0;
  employeePention: number = 0;
  eachEmployeeData: any = [];

  salaryCalculation(employeeId: number) {
    for (let i = 0; i < this.employeeSalaryList$.length; i++) {
      if (employeeId == this.employeeSalaryList$[i].employeeId) {
        this.salayId = this.employeeSalaryList$[i].id;
        this.grossSalary = this.employeeSalaryList$[i].salary;
        for (let index = 0; index < this.taxRuleList$.length; index++) {
          if (this.grossSalary >= 0 && this.grossSalary <= 600) {
            this.baseSalary = this.grossSalary;
          } else if (
            this.taxRuleList$[index].toSalary >= this.grossSalary &&
            this.taxRuleList$[index].fromSalary <= this.grossSalary
          ) {
            this.salaryIncomeTax =
              (this.grossSalary * this.taxRuleList$[index].percentageAmount) /
                100 -
              this.taxRuleList$[index].deduction;
            this.employeePention = (this.grossSalary * 7) / 100;
            this.baseSalary =
              this.grossSalary - this.salaryIncomeTax - this.employeePention;
          }
        }
      }
    }
    var payrollReportList = {
      baseSalary: +this.baseSalary,
      employeeId: +employeeId,
      employeeSalaryId: +this.salayId,
      date: this.date,
      month: this.month,
      year: this.year,
    };
    this.addPayrollReport(payrollReportList);
  }

  getTaxRule() {
    this.settingService.getTaxRuleApi().subscribe((res) => {
      this.taxRuleList$ = res;
    });
  }
  getDeduction() {
    this.employeeService.getAllowanceDeductionApi().subscribe((res) => {
      this.allowanceDeduction$ = res;
    });
  }
  payrollCalculation() {
    for (let index = 0; index < this.employeeList$.length; index++) {
      this.salaryCalculation(this.employeeList$[index].id);
    }
  }
  addPayrollReport(payrollReportList: any) {
    console.log(payrollReportList);
    this.payrollReportService.addPayrollReportApi(payrollReportList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.baseSalary + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updatePayrollReport() {
    var payrollReportList = {
      id: this.id,
      baseSalary: +this.baseSalary,
      employeeId: +this.employeeId,
      employeeSalaryId: +this.employeeSalaryId,
      date: this.date,
      month: this.month,
      year: this.year,
    };
    var id: number = this.id;
    console.log(payrollReportList);

    this.payrollReportService
      .updatePayrollReportApi(id, payrollReportList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.baseSalary + ' Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
        },
        (err) => {
          this.toast.error({
            detail: 'Error',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
}
