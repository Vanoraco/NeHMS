import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { SettingService } from 'src/app/services/setting.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-employee-roles',
  templateUrl: './employee-roles.component.html',
  styleUrls: ['./employee-roles.component.css'],
})
export class EmployeeRolesComponent implements OnInit {
  employeeRolesList$: any;
  modalTitle: string = '';
  activateEmployeeRolesComponent: boolean = false;
  employeeRolesList: any;
  fileName = 'emp-roles.xlsx';
  constructor(
    private employeeRolesService: EmployeeService,
    private permissionService: SettingService
  ) {}

  ngOnInit(): void {
    this.getRoleList();
  }

  getRoleList() {
    this.employeeRolesService.getEmployeeRoleApi().subscribe((res) => {
      this.employeeRolesList$ = res;
      if (this.employeeRolesList$) {
        for (let index = 0; index < this.employeeRolesList$.length; index++) {
          let permission = this.employeeRolesList$[index].permission.split(',');
          console.log('Each Permission = ' + permission);
        }
      }
    });
  }

  modalAdd() {
    this.employeeRolesList = {
      id: 0,
      name: null,
      description: null,
      permission: null,
    };
    this.modalTitle = 'Add Employee Role';
    this.activateEmployeeRolesComponent = true;
  }

  modalEdit(item: any) {
    this.employeeRolesList = item;
    this.modalTitle = 'Edit Employee Role';
    this.activateEmployeeRolesComponent = true;
  }
  
  delete(item: any) {
    if (confirm(`Are you sure you want to delete Employee Role ${item.id}`)) {
      this.employeeRolesService
        .deleteEmployeeRoleApi(item.id)
        .subscribe((res) => {
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getRoleList();
        });
    }
  }
  modalClose() {
    this.activateEmployeeRolesComponent = false;
    this.getRoleList();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('emp-role-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
