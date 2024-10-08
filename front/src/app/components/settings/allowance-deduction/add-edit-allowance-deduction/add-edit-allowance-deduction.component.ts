import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-edit-allowance-deduction',
  templateUrl: './add-edit-allowance-deduction.component.html',
  styleUrls: ['./add-edit-allowance-deduction.component.css'],
})
export class AddEditAllowanceDeductionComponent implements OnInit {
  allowanceDeductionList$!: Observable<any[]>;
  employeeList$!: Observable<any[]>;
  getAllowanceDeductionTypeList$!: Observable<any[]>;

  constructor(
    private allowanceDeductionService: EmployeeService,
    private route: ActivatedRoute
  ) {}
  @Input() allowanceDeductionList: any;
  id: number = 0;
  employeeId: number = 0;
  month: string = '';
  year: string = '';
  fixedAmount: number = 0;
  allowanceDeductionTypeId: number = 0;

  ngOnInit(): void {
    this.id = this.allowanceDeductionList.id;
    this.employeeId = this.allowanceDeductionList.employeeId;
    this.month = this.allowanceDeductionList.month;
    this.year = this.allowanceDeductionList.year;
    this.fixedAmount = this.allowanceDeductionList.fixedAmount;
    this.allowanceDeductionTypeId =
      this.allowanceDeductionList.allowanceDeductionTypeId;
    this.employeeList$ =
      this.allowanceDeductionService.getEmployeeApi();
    this.allowanceDeductionList$ =
      this.allowanceDeductionService.getAllowanceDeductionApi();
    this.getAllowanceDeductionTypeList$ =
      this.allowanceDeductionService.getAllowanceDeductionTypeApi();
  }

  addAllowanceDeduction() {
    var allowanceDeductionList = {
      employeeId: +this.employeeId,
      fixedAmount: +this.fixedAmount,
      month: this.month,
      year: this.year,
      allowanceDeductionTypeId: +this.allowanceDeductionTypeId,
    };
    console.log(allowanceDeductionList);
    this.allowanceDeductionService
      .addAllowanceDeductionApi(allowanceDeductionList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById(
          'allowance-deduction-modal-close'
        );
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.allowanceDeductionList$ =
          this.allowanceDeductionService.getAllowanceDeductionApi();
      });
  }
  updateAllowanceDeduction() {
    var AllowanceDeduction = {
      id: this.id,
      employeeId: +this.employeeId,
      fixedAmount: +this.fixedAmount,
      month: this.month,
      year: this.year,
      allowanceDeductionTypeId: +this.allowanceDeductionTypeId,
    };
    var id: number = this.id;
    this.allowanceDeductionService
      .updateAllowanceDeductionApi(id, AllowanceDeduction)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById(
          'allowance-deduction-modal-close'
        );
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.allowanceDeductionList$ =
          this.allowanceDeductionService.getAllowanceDeductionApi();
      });
  }
}
