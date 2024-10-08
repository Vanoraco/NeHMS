import { EmployeeService } from 'src/app/services/employee.service';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-add-edit-birth',
  templateUrl: './add-edit-birth.component.html',
  styleUrls: ['./add-edit-birth.component.css'],
})
export class AddEditBirthComponent implements OnInit {
  birthList$: any;
  getEmployeeList$!: Observable<any[]>;
  getPatientList$!: Observable<any[]>;
  getGenderList$!: Observable<any[]>;
  constructor(
    private patientService: PatientService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}
  @Input() birthList: any;
  id: number = 0;
  employeeId: number = 0;
  childGender: number = 0;
  patientId: number = 0;
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.getGenderList$ = this.employeeService.getGenders();
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.getPatientList$ = this.employeeService.getPatientApi();
    this.birthList$ = this.patientService.getBirthApi();

    this.id = this.birthList.id;
    this.date = this.birthList.date;
    this.employeeId = this.birthList.employeeId;
    this.childGender = this.birthList.childGender;
    this.patientId = this.birthList.patientId;
    this.description = this.birthList.description;
  }

  addBirth() {
    var birthList = {
      date: this.date,
      employeeId: +this.employeeId,
      patientId: +this.patientId,
      childGender: +this.childGender,
      description: this.description,
    };
    console.log(birthList);
    this.patientService.addBirthApi(birthList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getPatientList$ = this.employeeService.getPatientApi();
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
  updateBirth() {
    var birth = {
      id: this.id,
      date: this.date,
      employeeId: +this.employeeId,
      patientId: +this.patientId,
      childGender: +this.childGender,
      description: this.description,
    };
    var id: number = this.id;
    this.patientService.updateBirthApi(id, birth).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getPatientList$ = this.employeeService.getPatientApi();
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
