import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-add-edit-medical-certificates',
  templateUrl: './add-edit-medical-certificates.component.html',
  styleUrls: ['./add-edit-medical-certificates.component.css'],
})
export class AddEditMedicalCertificatesComponent implements OnInit {
  getMedicalCertficateList$!: Observable<any[]>;
  getEmployeeList$!: Observable<any[]>;
  constructor(
    private medicalService: PatientService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}
  @Input() medicalCertificateList: any;
  id: number = 0;
  employeeId: number = 0;
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  timeStamp: string = '';
  numberOfDate: string = '';
  date: string = '';

  ngOnInit(): void {
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.getMedicalCertficateList$ =
      this.medicalService.getMedicalCertificateApi();
    this.id = this.medicalCertificateList.id;
    this.employeeId = this.medicalCertificateList.employeeId;
    this.description = this.medicalCertificateList.description;
    this.startDate = this.medicalCertificateList.startDate;
    this.endDate = this.medicalCertificateList.endDate;
    this.timeStamp = this.medicalCertificateList.timeStamp;
    this.numberOfDate = this.medicalCertificateList.numberOfDate;
    this.date = this.medicalCertificateList.date;
  }
  addmedicalCertificate() {
    var medicalCertificateList = {
      employeeId: +this.employeeId,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      timeStamp: this.timeStamp,
      numberOfDate: this.numberOfDate,
      date: this.date,
    };
    console.log(medicalCertificateList);
    this.medicalService
      .addMedicalCertificateApi(medicalCertificateList)
      .subscribe(
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

  updatemedicalCertificate() {
    var medicalCertificate = {
      id: this.id,
      employeeId: +this.employeeId,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      timeStamp: this.timeStamp,
      numberOfDate: this.numberOfDate,
      date: this.date,
    };
    var id: number = this.id;
    this.medicalService
      .updateMedicalCertificateApi(id, medicalCertificate)
      .subscribe(
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
