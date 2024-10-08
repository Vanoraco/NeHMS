import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css'],
})
export class PayrollComponent implements OnInit {
  payrollList$: any = [];
  employeeList$: any;
  employeeSalaryList$: any;

  loggedInEmployeeid: number;
  loggedInEmployeeList: any;
  loggedInEmployee: any = [];
  loggedInEmployeeRole: any = [];
  loggedInEmployeeEmail: any;
  // Variables (properties)
  modalTitle: string = '';
  activatePayrollComponent: boolean = false;
  payrollList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  // Map to display data associate with foreign keys
  employeeListMap: Map<number, string> = new Map();
  employeeSalaryListMap: Map<number, string> = new Map();

  id: number = 0;
  constructor(
    private payrollService: BillingService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPayrollList();
    this.getEmployeeSalaryMap();
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeService.getEmployeeByIdApi(this.id).subscribe((res) => {
      this.employeeList$ = res;
    });

    this.loggedInEmployeeEmail = this.authService.getEmailFromToken();
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.loggedInEmployeeList = data;
      for (let index = 0; index < this.loggedInEmployeeList.length; index++) {
        if (
          this.loggedInEmployeeEmail ==
          this.loggedInEmployeeList[index].emailAddress
        ) {
          this.getEmployeeById(this.loggedInEmployeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.loggedInEmployee = data;
      this.getEmployeeRole(this.loggedInEmployee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.employeeService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.loggedInEmployeeRole = data;
    });
  }

  getPayrollList() {
    this.payrollService.getPayrollReportApi().subscribe((response) => {
      this.payrollList$ = response.filter(
        (payroll: { employeeId: number }) => payroll.employeeId == this.id
      );
    });
  }

  // getEmployeeNameMap() {
  //   this.employeeService.getEmployeeApi().subscribe((data) => {
  //     this.employeeList$ = data;
  //     for (let i = 0; i < data.length; i++) {
  //       this.employeeListMap.set(
  //         this.employeeList$[i].id,
  //         this.employeeList$[i].firstName +
  //           ' ' +
  //           this.employeeList$[i].lastName +
  //           ` (${this.employeeList$[i].id})`
  //       );
  //     }
  //   });
  // }

  getEmployeeSalaryMap() {
    this.employeeService.getEmployeeSalaryApi().subscribe((data) => {
      this.employeeSalaryList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeSalaryListMap.set(
          this.employeeSalaryList$[i].id,
          this.employeeSalaryList$[i].salary
        );
      }
    });
  }

  modalAllowanceDeductionTitle: string = '';
  activateAllowanceDeductionComponent: boolean = false;
  allowanceDeductionList: any;

  modalAddAllowanceDeduction(item: any) {
    this.allowanceDeductionList = {
      id: 0,
      payrollId: item.id,
      month: item.month,
      employeeId: item.employeeId,
      year: item.year,
      fixedAmount: 0,
      allowanceDeductionTypeId: null,
    };
    this.modalAllowanceDeductionTitle = 'Add allowance deduction';
    this.activateAllowanceDeductionComponent = true;
  }
  modalAdd() {
    this.payrollList = {
      id: 0,
      baseSalary: 0,
      date: null,
      month: null,
      year: null,
      employeeId: null,
      employeeSalaryId: null,
    };
    this.modalTitle = 'Add Payroll ';
    this.activatePayrollComponent = true;
  }

  modalEdit(item: any) {
    this.payrollList = item;
    this.modalTitle = 'Edit Payroll ';
    this.activatePayrollComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete payroll   ${item.id}`)) {
      this.payrollService.deletePayrollReportApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getPayrollList();
      });
    }
  }

  modalClose() {
    this.activatePayrollComponent = false;
    this.getPayrollList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPayrollList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPayrollList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.payrollList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  sortByName(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
}
