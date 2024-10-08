import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/model/employeemodel';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  employee: Employee;
  id: number;
  submitted: boolean = false;

  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'eye-slash';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeService
      .getEmployeeByIdApi(this.id)
      .subscribe((data: Employee) => {
        this.employee = data;
      });
    this.loginForm = this.fb.group({
      emailAddress: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          // Validators.pattern(
          //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
          // ),
        ]),
      ],
    });
  }
  get controls() {
    return this.loginForm.controls;
  }
  loginUser() {
    this.submitted = true;
    this.authService.employeeLoginApi(this.loginForm.value).subscribe(
      (res: any) => {
        if (res) {
          this.authService.storeToken(res.token);
          this.toast.success({
            detail: 'SUCCESS',
            summary: res.message,
            duration: 4000,
          });
          this.router.navigate(['/dashboard']);
        }
      },
      (err) => {
        console.log(err);
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong!!',
          duration: 4000,
        });
      }
    );
  }

  showHidePass() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.eyeIcon = 'eye') : (this.eyeIcon = 'eye-slash');
  }
}
