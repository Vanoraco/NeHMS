import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-add-edit-medical-history-family',
  templateUrl: './add-edit-medical-history-family.component.html',
  styleUrls: ['./add-edit-medical-history-family.component.css'],
})
export class AddEditMedicalHistoryFamilyComponent implements OnInit {
  medicalHistoryFamilyList$!: Observable<any[]>;
  getPatientList$!: Observable<any[]>;
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private medicalHistoryFamilyService: PatientService
  ) {}
  @Input() medicalHistoryFamilyList: any;
  id: number = 0;
  patientId: number = 0;
  familyDisease: string = '';
  deceasedFamily: string = '';
  description: string = '';

  ngOnInit(): void {
    this.getPatientList$ = this.employeeService.getPatientApi();
    this.patientId = this.medicalHistoryFamilyList.patientId;
    this.familyDisease = this.medicalHistoryFamilyList.familyDisease;
    this.description = this.medicalHistoryFamilyList.description;
    this.deceasedFamily = this.medicalHistoryFamilyList.deceasedFamily;
  }
  addMedicalHistoryFamily() {
    var medicalHistoryFamilyList = {
      patientId: +this.patientId,
      familyDisease: this.familyDisease,
      description: this.description,
      deceasedFamily: this.deceasedFamily,
    };
    console.log(medicalHistoryFamilyList);
    this.medicalHistoryFamilyService
      .addMedicalHistoryFamilyApi(medicalHistoryFamilyList)
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
  updateMedicalHistoryFamily() {
    var medicalHistoryFamList = {
      id: this.id,
      patientId: +this.patientId,
      familyDisease: this.familyDisease,
      description: this.description,
      deceasedFamily: this.deceasedFamily,
    };
    var id: number = this.id;
    this.medicalHistoryFamilyService
      .updateMedicalHistoryFamilyApi(id, medicalHistoryFamList)
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
