import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/model/employeemodel';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AdmissionService } from 'src/app/services/admission.service';
import { switchMap } from 'rxjs';

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

  selectedRole: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private admissionService: AdmissionService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailAddress: [''],
      password: [''],
      patientId: ['']
    });

    this.selectedRole = 'patient';
    this.onRoleChange();
  }

  onRoleChange() {
    // Reset form
    this.loginForm.reset();
    
    if (this.selectedRole === 'employee') {
      // Set up employee validation
      this.loginForm.get('emailAddress')?.setValidators([Validators.required, Validators.email]);
      this.loginForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.loginForm.get('patientId')?.clearValidators();
    } else {
      // Set up patient validation
      this.loginForm.get('patientId')?.setValidators([Validators.required]);
      this.loginForm.get('emailAddress')?.clearValidators();
      this.loginForm.get('password')?.clearValidators();
    }

    // Update validity
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.updateValueAndValidity();
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.valid) {
      if (this.selectedRole === 'employee') {
        this.authService.employeeLoginApi(this.loginForm.value).subscribe({
          next: (res: any) => {
            console.log(this.loginForm.value);
            this.authService.storeToken(res.token);
            
            this.toast.success({
              detail: 'SUCCESS',
              summary: res.message,
              duration: 4000,
            });
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            console.log(err);
            this.toast.error({
              detail: 'ERROR',
              summary: 'Something went wrong!',
              duration: 4000,
            });
          }
        });
      } else {
        // Logic for patient login after employee login
        const patientId = this.loginForm.value.patientId; // Get the patient ID from the form
  
        // First login with admin credentials to access patient data
        const adminLogin = { emailAddress: 'jhonedoe@gmail.com', password: 'abc123', patientId: null };
        this.authService.employeeLoginApi(adminLogin).pipe(
          switchMap((res: any) => {
            console.log(res.token)
            if (res.token) {
              this.authService.storeToken(res.token);
              localStorage.setItem('Role', 'Patient')
              
            }
            this.toast.success({
              detail: 'SUCCESS',
              summary: res.message || 'Admin login successful',
              duration: 4000,
            });
  
            // Now call the admission service to get admission details for the patient
            return this.admissionService.getAdmissionByIdApi(patientId);
          })
        ).subscribe({
          next: (admissionData) => {
            // Handle the admission data as needed
            console.log('Admission Data:', admissionData);
            
            this.router.navigate([`/admission-details/${patientId}`]);
             // Navigate to the admission details page
             setTimeout(() => {
              window.location.reload();
            }, 10);
          },
          error: (err) => {
            console.error('Error fetching admission data:', err);
            this.toast.error({
              detail: 'ERROR',
              summary: 'Could not fetch admission data.',
              duration: 4000,
            });
          }
        });
      }
    }
  }
  

  loginPatient() {
    this.submitted = true;
    if (this.loginForm.valid) {
      const patientId = this.loginForm.value.patientId; // Get the patient ID from the form

      // Call the admission service to get admission details for the patient
      this.admissionService.getAdmissionByIdApi(patientId).subscribe({
        next: (admissionData) => {
          // Handle the admission data as needed
          console.log('Admission Data:', admissionData);
          this.router.navigate([`/admission-details/${patientId}`]); // Navigate to the admission details page
        },
        error: (err) => {
          console.error('Error fetching admission data:', err);
          this.toast.error({
            detail: 'ERROR',
            summary: 'Could not fetch admission data.',
            duration: 4000,
          });
        }
      });
    }
  }

  showHidePass() {
    this.isText = !this.isText;
    this.isText ? (this.type = 'text') : (this.type = 'password');
    this.isText ? (this.eyeIcon = 'eye') : (this.eyeIcon = 'eye-slash');
  }
}
