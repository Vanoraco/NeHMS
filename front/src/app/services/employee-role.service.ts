import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeRoleService {
  // Variables (properties)
  id: number;
  employeeList: any = [];
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  constructor(
    private empService: EmployeeService,
    public router: Router,
    private authService: AuthService
  ) {}
  getRole() {
    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }
  getEmployeeById(id: string | number) {
    this.empService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
      this.getEmployeeRole(this.employee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.empService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.employeeRole = data;
    });
  }
}
