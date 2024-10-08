import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  id: number;
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  constructor(
    public router: Router,
    private authService: AuthService,
    private empRoleName: EmployeeService
  ) {}

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken();
    this.empRoleName.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.empRoleName.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
      this.getEmployeeRole(this.employee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.empRoleName.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.employeeRole = data;
      let loggedInEmpPermission = this.employeeRole.permission.split(',');
      for (let index = 0; index < loggedInEmpPermission.length; index++) {
        this.eachPermission = loggedInEmpPermission[index];
      }
    });
  }
}
