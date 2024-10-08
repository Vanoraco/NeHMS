import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-medical-interview-socrates-form',
  templateUrl: './medical-interview-socrates-form.component.html',
  styleUrls: ['./medical-interview-socrates-form.component.css'],
})
export class MedicalInterviewSocratesFormComponent implements OnInit {
  medicalInterviewSocratesList$: any;
  patientId$: any;

  constructor(
    private medicalInterviewSocratesService: LaboratoryService,
    private patientService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() medicalInterviewSocratesList: any;
  id: number = 0;
  patientId: number = 0;
  painOnSetSide: string = '';
  painOnSetSuddenGradual: string = '';
  painOnSetProgressiveRgressive: string = '';
  painOnSetSideDuration: string = '';
  painCharacteristics: string = '';
  painRadiation: string = '';
  painAssociation: string = '';
  painTimeCourse: string = '';
  painExacerbatingRelivingFactor: string = '';
  painSeverity: string = '';

  ngOnInit(): void {
    this.id = this.medicalInterviewSocratesList.id;
    this.patientId = this.medicalInterviewSocratesList.patientId;
    this.painOnSetSide = this.medicalInterviewSocratesList.painOnSetSide;
    this.painOnSetSuddenGradual = this.medicalInterviewSocratesList.painOnSetSuddenGradual;
    this.painOnSetProgressiveRgressive = this.medicalInterviewSocratesList.painOnSetProgressiveRgressive;
    this.painOnSetSideDuration = this.medicalInterviewSocratesList.painOnSetSideDuration;
    this.painCharacteristics = this.medicalInterviewSocratesList.painCharacteristics;
    this.painRadiation = this.medicalInterviewSocratesList.painRadiation;
    this.painAssociation = this.medicalInterviewSocratesList.painAssociation;
    this.painTimeCourse = this.medicalInterviewSocratesList.painTimeCourse;
    this.painExacerbatingRelivingFactor = this.medicalInterviewSocratesList.painExacerbatingRelivingFactor;
    this.painSeverity = this.medicalInterviewSocratesList.painSeverity;

    this.medicalInterviewSocratesList$ =
      this.medicalInterviewSocratesService.getMedicalInterviewSocratesApi();
    this.patientId$ = this.patientService.getPatientApi();
  }

  addMedicalInterviewSocrates() {
    var medicalInterviewSocratesList = {
      patientId: +this.patientId,
      painOnSetSide: this.painOnSetSide,
      painOnSetSuddenGradual: this.painOnSetSuddenGradual,
      painOnSetProgressiveRgressive: this.painOnSetProgressiveRgressive,
      painOnSetSideDuration: this.painOnSetSideDuration,
      painCharacteristics: this.painCharacteristics,
      painRadiation: this.painRadiation,
      painAssociation: this.painAssociation,
      painTimeCourse: this.painTimeCourse,
      painExacerbatingRelivingFactor: this.painExacerbatingRelivingFactor,
      painSeverity: this.painExacerbatingRelivingFactor,
    };
    console.log(medicalInterviewSocratesList);
    this.medicalInterviewSocratesService
      .addMedicalInterviewSocratesApi(medicalInterviewSocratesList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.painOnSetSide + ' Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
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
  updateMedicalInterviewSocrates() {
    var medicalInterviewSocratesList = {
      id: this.id,
      patientId: +this.patientId,
      painOnSetSide: this.painOnSetSide,
      painOnSetSuddenGradual: this.painOnSetSuddenGradual,
      painOnSetProgressiveRgressive: this.painOnSetProgressiveRgressive,
      painOnSetSideDuration: this.painOnSetSideDuration,
      painCharacteristics: this.painCharacteristics,
      painRadiation: this.painRadiation,
      painAssociation: this.painAssociation,
      painTimeCourse: this.painTimeCourse,
      painExacerbatingRelivingFactor: this.painExacerbatingRelivingFactor,
      painSeverity: this.painSeverity,
    };
    var id: number = this.id;
    console.log(medicalInterviewSocratesList);

    this.medicalInterviewSocratesService
      .updateMedicalInterviewSocratesApi(id, medicalInterviewSocratesList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.painOnSetSide + ' Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
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
