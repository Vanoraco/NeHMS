import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/model/employeemodel';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees-profile',
  templateUrl: './employees-profile.component.html',
  styleUrls: ['./employees-profile.component.css'],
})
export class EmployeeProfileComponent implements OnInit {
  employee: any = [];
  employeeRole: any = [];
  countryNameMap: any = [];

  countryMap: Map<number, string> = new Map();

  loggedInEmployeeid: number;
  loggedInEmployeeList: any;
  loggedInEmployee: any = [];
  loggedInEmployeeRole: any = [];
  loggedInEmployeeEmail: any;

  id: number = 0;
  submitted: boolean = false;

  constructor(
    public employeeService: EmployeeService,
    public authService: AuthService,
    public fb: FormBuilder,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  registrationForm = this.fb.group({
    employeeId: new FormControl(0),
    emailAddress: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
      ])
    ),
  });

  ngOnInit() {
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeService
      .getEmployeeByIdApi(this.id)
      .subscribe((res: Employee) => {
        this.employee = res;
        this.getEmpRole(this.employee.employeeRoleId);
        this.getCountryName(this.employee.countryId);
        this.registrationForm.get('employeeId')?.setValue(this.employee.id);
        this.registrationForm
          .get('emailAddress')
          ?.setValue(this.employee.emailAddress);
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

  get controls() {
    return this.registrationForm.controls;
  }
  getCountryName(id: any) {
    this.employeeService.getCountries().subscribe((res: any) => {
      this.countryNameMap = res;
      for (let i = 0; i < res.length; i++) {
        if (this.countryNameMap[i].id === id) {
          this.countryMap.set(
            this.countryNameMap[i].id,
            this.countryNameMap[i].name
          );
        }
      }
    });
  }

  getEmpRole(id: number) {
    this.employeeService.getEmployeeRoleByIdApi(id).subscribe((res) => {
      this.employeeRole = res;
    });
  }

  registerEmployee() {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    console.log(this.registrationForm.value);
    this.authService
      .employeeRegisterApi(this.registrationForm.value)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary:
            this.registrationForm.value.emailAddress + ' Sucessfully Added',
          duration: 4000,
        });
        this.clear();
        this.router.navigate(['/employee-list']);
      });
  }
  clear() {
    this.submitted = false;
    this.registrationForm.reset();
  }
}
