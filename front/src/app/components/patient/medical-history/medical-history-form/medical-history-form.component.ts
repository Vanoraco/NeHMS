import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.css'],
})
export class MedicalHistoryFormComponent implements OnInit {
  medicalHistoryList$: any;
  patientId$: any;
  admissionId: any;
  admissionList: any;

  constructor(
    private medicalHistoryService: LaboratoryService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private patientService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() medicalHistoryList: any;
  id: number = 0;
  disease: string = '';
  treatment: string = '';
  riskFactor: string = '';
  description: string = '';

  ngOnInit(): void {
    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
    this.id = this.medicalHistoryList.id;
    this.disease = this.medicalHistoryList.disease;
    this.treatment = this.medicalHistoryList.treatment;
    this.riskFactor = this.medicalHistoryList.riskFactor;
    this.description = this.medicalHistoryList.description;

    this.medicalHistoryList$ =
      this.medicalHistoryService.getMedicalHistoryApi();
    // this.patientId$ = this.patientService.getPatientApi();
  }

  addMedicalHistory() {
    var medicalHistoryList = {
      disease: this.disease,
      patientId: +this.admissionList.patientId,
      treatment: this.treatment,
      riskFactor: this.riskFactor,
      description: this.description,
    };
    console.log(medicalHistoryList);
    this.medicalHistoryService
      .addMedicalHistoryApi(medicalHistoryList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.disease + ' Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('medical-history-modal-close');
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
  updateMedicalHistory() {
    var medicalHistoryList = {
      id: this.id,
      disease: this.disease,
      patientId: +this.admissionList.patientId,
      treatment: this.treatment,
      riskFactor: this.riskFactor,
      description: this.description,
    };
    var id: number = this.id;
    console.log(medicalHistoryList);

    this.medicalHistoryService
      .updateMedicalHistoryApi(id, medicalHistoryList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.disease + ' Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('medical-history-modal-close');
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
