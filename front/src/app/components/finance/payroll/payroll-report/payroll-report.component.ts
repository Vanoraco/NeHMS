import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-payroll-report',
  templateUrl: './payroll-report.component.html',
  styleUrls: ['./payroll-report.component.css'],
})
export class PayrollReportComponent implements OnInit {
  payrollReportList$: any = [];
  employeeList$: any;
  employeeSalaryList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activatePayrollReportComponent: boolean = false;
  payrollReportList: any;
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
    private payrollReportService: BillingService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPayrollReportList();
    this.getEmployeeNameMap();
    this.getEmployeeSalaryMap();
  }

  getPayrollReportList() {
    this.payrollReportService.getPayrollReportApi().subscribe((response) => {
      this.payrollReportList$ = response.reverse();
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
            this.employeeList$[i].lastName 
        );
      }
    });
  }

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

  modalAdd() {
    this.payrollReportList = {
      id: 0,
      baseSalary: 0,
      date: null,
      month: null,
      year: null,
      employeeId: null,
      employeeSalaryId: null,
    };
    this.modalTitle = 'Add Payroll Report';
    this.activatePayrollReportComponent = true;
  }

  modalEdit(item: any) {
    this.payrollReportList = item;
    this.modalTitle = 'Edit Payroll Report';
    this.activatePayrollReportComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete payroll report  ${item.id}`)) {
      this.payrollReportService
        .deletePayrollReportApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getPayrollReportList();
        });
    }
  }

  modalClose() {
    this.activatePayrollReportComponent = false;
    this.getPayrollReportList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPayrollReportList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPayrollReportList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.payrollReportList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.payrollReportList$.sort(
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

  sortByName(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }

  fileName = 'payroll-report.xlsx';
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
