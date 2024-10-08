import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-allowance-deduction-type',
  templateUrl: './allowance-deduction-type.component.html',
  styleUrls: ['./allowance-deduction-type.component.css'],
})
export class AllowanceDeductionTypeComponent implements OnInit {
  allowanceDeductionTypeList$: any = [];
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];
  constructor(
    private allowanceDeductionTypeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAllowanceDeductionType();
  }
  getAllowanceDeductionType() {
    this.allowanceDeductionTypeService
      .getAllowanceDeductionTypeApi()
      .subscribe((response) => {
        this.allowanceDeductionTypeList$ = response;
      });
  }
  modalTitle: string = '';
  activateAllowanceDeductionTypeListComponent: boolean = false;
  allowanceDeductionTypeList: any;
  modalAdd() {
    this.allowanceDeductionTypeList = {
      id: 0,
      name: null,
      description: null,
    };
    this.modalTitle = 'Add allowance deduction type';
    this.activateAllowanceDeductionTypeListComponent = true;
  }

  modalEdit(item: any) {
    this.allowanceDeductionTypeList = item;
    this.modalTitle = 'Edit allowance deduction type';
    this.activateAllowanceDeductionTypeListComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete allowance deduction type ${item.id}`
      )
    ) {
      this.allowanceDeductionTypeService
        .deleteAllowanceDeductionTypeApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById(
            'deduction-type-modal-close'
          );
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getAllowanceDeductionType();
        });
    }
  }
  modalClose() {
    this.activateAllowanceDeductionTypeListComponent = false;
    //
    this.getAllowanceDeductionType();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllowanceDeductionType();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllowanceDeductionType();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.allowanceDeductionTypeList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.allowanceDeductionTypeList.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[key] < b[key]) {
          return -1 * direction;
        } else if (a[key] < b[key]) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    );
  }
}
