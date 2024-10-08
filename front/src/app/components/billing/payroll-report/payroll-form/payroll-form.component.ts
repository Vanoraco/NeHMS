import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-payroll-form',
  templateUrl: './payroll-form.component.html',
  styleUrls: ['./payroll-form.component.css'],
})
export class PayrollFormComponent implements OnInit {
  payrollList$: any;
  employeeList$: any;
  employeeSalaryList$: any = [];
  taxRuleList$: any = [];
  allowanceDeduction$: any = [];

  constructor(
    private payrollService: BillingService,
    private employeeService: EmployeeService,
    private settingService: SettingService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  employeeId: number = 0;
  @Input() payrollList: any;
  id: number = 0;
  baseSalary: number = 0;
  employeeSalaryId: number = 0;
  date: string = '';
  month: string = '';
  year: string = '';

  ngOnInit(): void {
    this.id = this.payrollList.id;
    this.baseSalary = this.payrollList.baseSalary;
    this.employeeSalaryId = this.payrollList.employeeSalaryId;
    this.date = this.payrollList.date;
    this.month = this.payrollList.month;
    this.year = this.payrollList.year;

    this.employeeId = this.route.snapshot.params['employeeId'];
    this.payrollList$ = this.payrollService.getPayrollReportApi();
    this.getEmployeeSalary();
  }

  getEmployeeSalary() {
    this.employeeService.getEmployeeSalaryApi().subscribe((response) => {
      this.employeeSalaryList$ = response.filter(
        (employeeSalary: { employeeId: number }) =>
          employeeSalary.employeeId == this.employeeId
      );
    });
  }

  grossSalary: number = 0;
  selectedSalaryData: any = [];
  salaryIncomeTax: number = 0;
  employeePention: number = 0;

  salaryCalculation() {
    const selectedEmployeeSalaryId = +this.employeeSalaryId;
    this.getTaxRule();
    this.getDeduction();
    this.employeeService
      .getEmployeeSalaryByIdApi(selectedEmployeeSalaryId)
      .subscribe((response) => {
        this.selectedSalaryData = response;
        this.grossSalary = this.selectedSalaryData.salary;
        for (let index = 0; index < this.taxRuleList$.length; index++) {
          if (this.grossSalary >= 0 && this.grossSalary <= 600) {
            this.baseSalary = this.grossSalary;
            console.log('Correct < 600 : ' + this.baseSalary);
          } else if (
            this.taxRuleList$[index].toSalary >= this.grossSalary &&
            this.taxRuleList$[index].fromSalary <= this.grossSalary
          ) {
            this.salaryIncomeTax =
              (this.grossSalary * this.taxRuleList$[index].percentageAmount) /
              100;
            this.employeePention = (this.grossSalary * 7) / 100;
            this.baseSalary =
              this.grossSalary - this.salaryIncomeTax - this.employeePention;
            console.log('Correct > 600 : ' + this.baseSalary);
          }
        }
      });
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
  addPayroll() {
    var payrollList = {
      baseSalary: +this.baseSalary,
      employeeId: +this.employeeId,
      employeeSalaryId: +this.employeeSalaryId,
      date: this.date,
      month: this.month,
      year: this.year,
    };
    console.log(payrollList);
    this.payrollService.addPayrollReportApi(payrollList).subscribe(
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
  updatePayroll() {
    var payrollList = {
      id: this.id,
      baseSalary: +this.baseSalary,
      employeeId: +this.employeeId,
      employeeSalaryId: +this.employeeSalaryId,
      date: this.date,
      month: this.month,
      year: this.year,
    };
    var id: number = this.id;
    console.log(payrollList);

    this.payrollService.updatePayrollReportApi(id, payrollList).subscribe(
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
