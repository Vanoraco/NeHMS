import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-edit-allowance-deduction-type',
  templateUrl: './add-edit-allowance-deduction-type.component.html',
  styleUrls: ['./add-edit-allowance-deduction-type.component.css'],
})
export class AddEditAllowanceDeductionTypeComponent implements OnInit {
  allowanceDeductionTypeList$!: Observable<any[]>;
  constructor(private allowanceDeductionTypeService: EmployeeService) {}
  @Input() allowanceDeductionTypeList: any;
  id: number = 0;
  name: string = '';
  description: string = '';
  type: string = '';
  ngOnInit(): void {
    this.allowanceDeductionTypeList$ =
      this.allowanceDeductionTypeService.getAllowanceDeductionTypeApi();
    this.id = this.allowanceDeductionTypeList.id;
    this.name = this.allowanceDeductionTypeList.name;
    this.description = this.allowanceDeductionTypeList.description;
    this.type = this.allowanceDeductionTypeList.type;
  }
  addAllowanceDeduction() {
    var allowanceDeductionTypeList = {
      name: this.name,
      description: this.description,
      type: this.type,
    };
    console.log(allowanceDeductionTypeList);
    this.allowanceDeductionTypeService
      .addAllowanceDeductionTypeApi(allowanceDeductionTypeList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById(
          'deduction-type-modal-close'
        );
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.allowanceDeductionTypeList$ =
          this.allowanceDeductionTypeService.getAllowanceDeductionTypeApi();
      });
  }

  updateAllowanceDeduction() {
    var AllowanceDeductionTypeList = {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
    };
    var id: number = this.id;
    this.allowanceDeductionTypeService
      .updateAllowanceDeductionTypeApi(id, AllowanceDeductionTypeList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById(
          'deduction-type-modal-close'
        );
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.allowanceDeductionTypeList$ =
          this.allowanceDeductionTypeService.getAllowanceDeductionTypeApi();
      });
  }
}
