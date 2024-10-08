import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-medical-history-drug-form',
  templateUrl: './medical-history-drug-form.component.html',
  styleUrls: ['./medical-history-drug-form.component.css'],
})
export class MedicalHistoryDrugFormComponent implements OnInit {
  medicalHistoryDrugList$: any;
  patientId$: any;

  constructor(
    private medicalHistoryDrugService: LaboratoryService,
    private patientService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() medicalHistoryDrugList: any;
  id: number = 0;
  symptom: string = '';
  patientId: number = 0;
  postMedication: string = '';
  recratioalDrug: string = '';
  intravenousDrug: string = '';
  otcDrug: string = '';

  ngOnInit(): void {
    this.id = this.medicalHistoryDrugList.id;
    this.symptom = this.medicalHistoryDrugList.symptom;
    this.patientId = this.medicalHistoryDrugList.patientId;
    this.postMedication = this.medicalHistoryDrugList.postMedication;
    this.recratioalDrug = this.medicalHistoryDrugList.recratioalDrug;
    this.intravenousDrug = this.medicalHistoryDrugList.intravenousDrug;
    this.otcDrug = this.medicalHistoryDrugList.otcDrug;

    this.medicalHistoryDrugList$ =
      this.medicalHistoryDrugService.getMedicalHistoryDrugApi();
    this.patientId$ = this.patientService.getPatientApi();
  }

  addMedicalHistoryDrug() {
    var medicalHistoryDrugList = {
      symptom: this.symptom,
      patientId: +this.patientId,
      postMedication: this.postMedication,
      recratioalDrug: this.recratioalDrug,
      intravenousDrug: this.intravenousDrug,
      otcDrug: this.otcDrug,
    };
    console.log(medicalHistoryDrugList);
    this.medicalHistoryDrugService
      .addMedicalHistoryDrugApi(medicalHistoryDrugList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.symptom + ' Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          var showAddSuccess = document.getElementById('add-success-alert');
          if (showAddSuccess) {
            showAddSuccess.style.display = 'block';
          }
          setTimeout(function () {
            if (showAddSuccess) {
              showAddSuccess.style.display = 'none';
            }
          }, 4000);
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
  updateMedicalHistoryDrug() {
    var medicalHistoryDrugList = {
      id: this.id,
      symptom: this.symptom,
      patientId: +this.patientId,
      postMedication: this.postMedication,
      recratioalDrug: this.recratioalDrug,
      intravenousDrug: this.intravenousDrug,
      otcDrug: this.otcDrug,
    };
    var id: number = this.id;
    console.log(medicalHistoryDrugList);

    this.medicalHistoryDrugService
      .updateMedicalHistoryDrugApi(id, medicalHistoryDrugList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.symptom + ' Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }

          var showUpdateSuccess = document.getElementById(
            'update-success-alert'
          );
          if (showUpdateSuccess) {
            showUpdateSuccess.style.display = 'block';
          }
          setTimeout(function () {
            if (showUpdateSuccess) {
              showUpdateSuccess.style.display = 'none';
            }
          }, 4000);
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
