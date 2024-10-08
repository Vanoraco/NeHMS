import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-add-edit-employee-roles',
  templateUrl: './add-edit-employee-roles.component.html',
  styleUrls: ['./add-edit-employee-roles.component.css'],
})
export class AddEditEmployeeRolesComponent implements OnInit {
  employeeRolesList$!: Observable<any[]>;
  permissionList$!: Observable<any[]>;
  permissionData: string;
  constructor(
    private employeeRolesService: EmployeeService,
    private permissionService: SettingService
  ) {}
  @Input() employeeRolesList: any;
  id: number = 0;
  name: string = '';
  description: string = '';
  permission: string = '';
  ngOnInit(): void {
    this.employeeRolesList$ = this.employeeRolesService.getEmployeeRoleApi();
    this.permissionList$ = this.permissionService.getPermissionApi();
    this.id = this.employeeRolesList.id;
    this.name = this.employeeRolesList.name;
    this.description = this.employeeRolesList.description;
    this.permission = this.employeeRolesList.permission;
  }

  chageToString() {
    let permission = new Array(this.permission);
    this.permissionData = permission.toString();
  }

  addEmployeeRoles() {
    this.chageToString();
    var employeeRolesList = {
      name: this.name,
      description: this.description,
      permission: this.permissionData,
    };
    console.log(employeeRolesList);
    this.employeeRolesService
      .addEmployeeRoleApi(employeeRolesList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.employeeRolesList$ =
          this.employeeRolesService.getEmployeeRoleApi();
      });
  }
  updateEmployeeRoles() {
    this.chageToString();
    var employeeroles = {
      id: this.id,
      name: this.name,
      description: this.description,
      permission: this.permissionData,
    };
    var id: number = this.id;
    this.employeeRolesService
      .updateEmployeeRoleApi(id, employeeroles)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.employeeRolesList$ =
          this.employeeRolesService.getEmployeeRoleApi();
      });
  }
}
