import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
})
export class EmployeeFormComponent implements OnInit {
  languageList$!: Observable<any[]>;
  genderList$!: Observable<any[]>;
  countryList$!: Observable<any[]>;
  cityList$!: Observable<any[]>;
  maritalStatusList$!: Observable<any[]>;
  employeeRoleList$!: Observable<any[]>;
  designationsList$!: Observable<any[]>;
  medicalDepartmentsList$!: Observable<any[]>;
  specializationsList$!: Observable<any[]>;
  educationLevelList$!: Observable<any[]>;

  submitted: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() employeeList: any;
  id: number = 0;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  dateOfBirth: string = '';
  age: number = 0;
  phone: string = '';
  address: string = '';
  emailAddress: string = '';
  genderId: number = 0;
  maritalStatusId: number = 0;
  languageId: number = 0;
  educationLevelId: number = 0;
  employeeRoleId: number = 0;
  medicalDepartmentId: number = 0;
  cityId: number = 0;
  countryId: number = 0;
  designationId: number = 0;
  specializationId: number = 0;

  ngOnInit(): void {
    this.id = this.employeeList.id;
    this.firstName = this.employeeList.firstName;
    this.middleName = this.employeeList.middleName;
    this.lastName = this.employeeList.lastName;
    this.dateOfBirth = this.employeeList.dateOfBirth;
    this.age = this.employeeList.age;
    this.phone = this.employeeList.phone;
    this.address = this.employeeList.address;
    this.emailAddress = this.employeeList.emailAddress;
    this.genderId = this.employeeList.genderId;
    this.maritalStatusId = this.employeeList.maritalStatusId;
    this.languageId = this.employeeList.languageId;
    this.educationLevelId = this.employeeList.educationLevelId;
    this.employeeRoleId = this.employeeList.employeeRoleId;
    this.medicalDepartmentId = this.employeeList.medicalDepartmentId;
    this.cityId = this.employeeList.cityId;
    this.countryId = this.employeeList.countryId;
    this.designationId = this.employeeList.designationId;
    this.specializationId = this.employeeList.specializationId;

    this.languageList$ = this.employeeService.getLanguages();
    this.maritalStatusList$ = this.employeeService.getMaritalStatuses();
    this.educationLevelList$ = this.employeeService.getEducationLevels();
    this.employeeRoleList$ = this.employeeService.getEmployeeRole();
    this.medicalDepartmentsList$ = this.employeeService.getMedicalDepartments();
    this.genderList$ = this.employeeService.getGenders();
    this.cityList$ = this.employeeService.getCities();
    this.countryList$ = this.employeeService.getCountries();
    this.designationsList$ = this.employeeService.getDesignations();
    this.specializationsList$ = this.employeeService.getSpecializations();
  }

  currentDate = Date.now();
  ageCalculation() {
    this.currentDate = new Date().getFullYear();
    const dob = new Date(this.dateOfBirth).getFullYear();
    this.age = this.currentDate - dob;
  }

  addEmployee() {
    this.submitted = true;
    var employeeList = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      age: this.age,
      phone: this.phone,
      address: this.address,
      emailAddress: this.emailAddress,
      genderId: +this.genderId,
      maritalStatusId: +this.maritalStatusId,
      languageId: +this.languageId,
      educationLevelId: +this.educationLevelId,
      employeeRoleId: +this.employeeRoleId,
      cityId: +this.cityId,
      countryId: +this.countryId,
      designationId: +this.designationId,
      medicalDepartmentId: +this.medicalDepartmentId,
      specializationId: +this.specializationId,
    };
    console.log(employeeList);
    this.employeeService.addEmployeeApi(employeeList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.firstName + ' ' + this.lastName + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updateEmployee() {
    this.submitted = true;
    var employeeList = {
      id: this.id,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      age: this.age,
      phone: this.phone,
      address: this.address,
      emailAddress: this.emailAddress,
      genderId: +this.genderId,
      maritalStatusId: +this.maritalStatusId,
      languageId: +this.languageId,
      educationLevelId: +this.educationLevelId,
      employeeRoleId: +this.employeeRoleId,
      cityId: +this.cityId,
      countryId: +this.countryId,
      designationId: +this.designationId,
      medicalDepartmentId: +this.medicalDepartmentId,
      specializationId: +this.specializationId,
    };
    var id: number = this.id;
    console.log(employeeList);
    this.employeeService.updateEmployeeApi(id, employeeList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary:
            this.firstName + ' ' + this.lastName + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
}
