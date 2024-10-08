import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employeeList$: any;
  employeeRoleList$: any;
  employeeGenderList$: any;

  //Map to display data associate with foreign keys
  employeeRoleMap: Map<number, string> = new Map();
  employeeGenderMap: Map<number, string> = new Map();

  // Variables (properties)
  modalTitle: string = '';
  activateEmployeeComponent: boolean = false;
  employeeList: any;
  //search
  searchName: string = '';
  //sort
  key: string = '';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'employee.xlsx';
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
    this.getEmployeeRoleMap();
    this.getEmployeeGenderMap();
  }

  getEmployeeList() {
    this.employeeService.getEmployeeApi().subscribe((response) => {
      this.employeeList$ = response;
    });
  }

  getEmployeeRoleMap() {
    this.employeeService.getEmployeeRole().subscribe((response) => {
      this.employeeRoleList$ = response;
      for (let i = 0; i < response.length; i++) {
        this.employeeRoleMap.set(
          this.employeeRoleList$[i].id,
          this.employeeRoleList$[i].name
        );
      }
    });
  }
  getEmployeeGenderMap() {
    this.employeeService.getGenders().subscribe((response) => {
      this.employeeGenderList$ = response;
      for (let i = 0; i < response.length; i++) {
        this.employeeGenderMap.set(
          this.employeeGenderList$[i].id,
          this.employeeGenderList$[i].name
        );
      }
    });
  }

  modalAdd() {
    this.employeeList = {
      id: 0,
      firstName: null,
      middleName: null,
      lastName: null,
      dateOfBirth: null,
      age: 0,
      phone: null,
      address: null,
      emailAddress: null,
      genderId: null,
      maritalStatusId: null,
      languageId: null,
      educationLevelId: null,
      employeeRoleId: null,
      medicalDepartmentId: null,
      cityId: null,
      countryId: null,
      designationId: null,
      specializationId: null,
    };
    this.modalTitle = 'Add Employee';
    this.activateEmployeeComponent = true;
  }

  modalEdit(item: any) {
    this.employeeList = item;
    this.modalTitle = 'Edit Employee';
    this.activateEmployeeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete employee ${item.id}`)) {
      this.employeeService.deleteEmployeeApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary:
            item.firstName + ' ' + item.lastName + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getEmployeeList();
      });
    }
  }
  modalClose() {
    this.activateEmployeeComponent = false;
    this.getEmployeeList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getEmployeeList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEmployeeList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.employeeList.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.employeeList$.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
      if (a[key] < b[key]) {
        return -1 * direction;
      } else if (a[key] < b[key]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('employee-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
