import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-add-edit-medical-interview-allergies',
  templateUrl: './add-edit-medical-interview-allergies.component.html',
  styleUrls: ['./add-edit-medical-interview-allergies.component.css'],
})
export class AddEditMedicalInterviewAllergiesComponent implements OnInit {
  medicalInterviewList$!: Observable<any[]>;
  getEmployeeList$!: Observable<any[]>;
  getPatientList$!: Observable<any[]>;
  getAllergyList$!: Observable<any[]>;
  constructor(
    private employeeService: EmployeeService,
    private allergyService: PatientService
  ) {}
  @Input() medicalInterviewList: any;
  id: number = 0;
  patientId: number = 0;
  throatSwelling: string = '';
  allergyId: number = 0;
  puffFace: string = '';
  troubleBreathing: string = '';
  description: string = '';
  other: string = '';
  ngOnInit(): void {
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.getPatientList$ = this.employeeService.getPatientApi();
    this.getAllergyList$ = this.allergyService.getAllergyApi();
    this.medicalInterviewList$ =
      this.allergyService.getMedicalInterviewAllergyApi();
    this.id = this.medicalInterviewList.id;
    this.throatSwelling = this.medicalInterviewList.throatSwelling;
    this.puffFace = this.medicalInterviewList.puffFace;
    this.patientId = this.medicalInterviewList.patientId;
    this.troubleBreathing = this.medicalInterviewList.troubleBreathing;
    this.other = this.medicalInterviewList.other;
    this.description = this.medicalInterviewList.description;
    this.allergyId = this.medicalInterviewList.allergyId;
  }
  addMedicalInterviewList() {
    var medicalInterviewList = {
      throatSwelling: this.throatSwelling,
      patientId: +this.patientId,
      puffFace: this.puffFace,
      troubleBreathing: this.troubleBreathing,
      description: this.description,
      allergyId: +this.allergyId,
      other: this.other,
    };

    console.log(medicalInterviewList);
    this.allergyService
      .addMedicalInterviewAllergyApi(medicalInterviewList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
  }
  updateMedicalInterviewList() {
    var medicalInterview = {
      id: this.id,
      throatSwelling: this.throatSwelling,
      patientId: +this.patientId,
      puffFace: this.puffFace,
      allergyId: +this.allergyId,
      troubleBreathing: this.troubleBreathing,
      description: this.description,
      other: this.other,
    };
    var id: number = this.id;
    this.allergyService
      .updateMedicalInterviewAllergyApi(id, medicalInterview)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
  }
}
