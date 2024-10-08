import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { BillingService } from 'src/app/services/billing.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-modal-add-allowance-deduction',
  templateUrl: './modal-add-allowance-deduction.component.html',
  styleUrls: ['./modal-add-allowance-deduction.component.css'],
})
export class ModalAddAllowanceDeductionComponent implements OnInit {
  allowanceDeductionList$!: Observable<any[]>;
  getAllowanceDeductionTypeList$!: Observable<any[]>;
  employeeId: number = 0;

  constructor(
    private allowanceDeductionService: EmployeeService,
    private payrollService: BillingService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {}
  @Input() allowanceDeductionList: any;
  id: number = 0;
  payrollId: number = 0;
  month: string = '';
  year: string = '';
  fixedAmount: number = 0;
  allowanceDeductionTypeId: number = 0;

  ngOnInit(): void {
    this.id = this.allowanceDeductionList.id;
    this.payrollId = this.allowanceDeductionList.payrollId;
    this.employeeId = this.allowanceDeductionList.employeeId;
    this.month = this.allowanceDeductionList.month;
    this.year = this.allowanceDeductionList.year;
    this.fixedAmount = this.allowanceDeductionList.fixedAmount;
    this.allowanceDeductionTypeId =
      this.allowanceDeductionList.allowanceDeductionTypeId;

    this.allowanceDeductionList$ =
      this.allowanceDeductionService.getAllowanceDeductionApi();
    this.getAllowanceDeductionTypeList$ =
      this.allowanceDeductionService.getAllowanceDeductionTypeApi();
  }

  addAllowanceDeduction() {
    var allowanceDeductionList = {
      month: this.month,
      employeeId: +this.employeeId,
      fixedAmount: +this.fixedAmount,
      year: this.year,
      allowanceDeductionTypeId: +this.allowanceDeductionTypeId,
    };
    console.log(allowanceDeductionList);
    this.allowanceDeductionService
      .addAllowanceDeductionApi(allowanceDeductionList)
      .subscribe(
        (res) => {
          this.updatePayrollAfterAllowanceDeduction(this.payrollId);
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.fixedAmount + ' Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById(
            'allowance-deduction-modal-close'
          );
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
  payrollList: any = [];
  updatePayrollAfterAllowanceDeduction(payrollId: number) {
    this.payrollService.getPayrollReportByIdApi(payrollId).subscribe((res) => {
      this.payrollList = res;
      if (res) {
        this.updatePayroll();
      }
    });
  }
  updatePayroll() {
    var payrollList = {
      id: this.payrollList.id,
      baseSalary: +this.payrollList.baseSalary - this.fixedAmount,
      employeeId: +this.payrollList.employeeId,
      employeeSalaryId: +this.payrollList.employeeSalaryId,
      date: this.payrollList.date,
      month: this.payrollList.month,
      year: this.payrollList.year,
    };
    var id: number = this.payrollList.id;
    console.log(payrollList);

    this.payrollService.updatePayrollReportApi(id, payrollList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: payrollList.baseSalary + ' Sucessfully Updated!',
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
