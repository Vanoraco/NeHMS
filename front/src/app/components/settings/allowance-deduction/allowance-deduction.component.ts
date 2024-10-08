import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-allowance-deduction',
  templateUrl: './allowance-deduction.component.html',
  styleUrls: ['./allowance-deduction.component.css'],
})
export class AllowanceDeductionComponent implements OnInit {
  employeeList$: any = [];
  allowanceDeductionList$: any = [];
  allowanceDeductionType$: any = [];

  employeeListMap: Map<number, string> = new Map();
  allowanceDeductionTypeMap: Map<number, string> = new Map();
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAllowanceDeductionTypeMap();
    this.getAllowanceDeduction();
    this.getEmployeeNameMap();
  }
  modalTitle: string = '';
  activateAllowanceDeductionComponent: boolean = false;
  allowanceDeductionList: any;

  getAllowanceDeduction() {
    this.employeeService.getAllowanceDeductionApi().subscribe((response) => {
      this.allowanceDeductionList$ = response;
    });
  }

  getAllowanceDeductionTypeMap() {
    this.employeeService.getAllowanceDeductionTypeApi().subscribe((res) => {
      this.allowanceDeductionType$ = res;
      for (let i = 0; i < res.length; i++) {
        this.allowanceDeductionTypeMap.set(
          this.allowanceDeductionType$[i].id,
          this.allowanceDeductionType$[i].name
        );
      }
    });
  }

  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeListMap.set(
          this.employeeList$[i].id,
          this.employeeList$[i].firstName +
            ' ' +
            this.employeeList$[i].lastName +
            ` (${this.employeeList$[i].id})`
        );
      }
    });
  }

  modalAdd() {
    this.allowanceDeductionList = {
      id: 0,
      month: null,
      employeeId: null,
      year: null,
      fixedAmount: 0,
      allowanceDeductionTypeId: null,
    };
    this.modalTitle = 'Add allowance deduction';
    this.activateAllowanceDeductionComponent = true;
  }

  modalEdit(item: any) {
    this.allowanceDeductionList = item;
    this.modalTitle = 'Edit allowance deduction';
    this.activateAllowanceDeductionComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete allowance deduction ${item.id}`)
    ) {
      this.employeeService.deleteAllowanceDeductionApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById(
          'allowance-deduction-modal-close'
        );
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAllowanceDeduction();
      });
    }
  }
  modalClose() {
    this.activateAllowanceDeductionComponent = false;
    this.getAllowanceDeduction();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllowanceDeduction();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllowanceDeduction();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.allowanceDeductionList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.allowanceDeductionList.sort(
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
