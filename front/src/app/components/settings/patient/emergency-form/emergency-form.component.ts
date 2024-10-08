import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-emergency-form',
  templateUrl: './emergency-form.component.html',
  styleUrls: ['./emergency-form.component.css'],
})
export class EmergencyFormComponent implements OnInit {
  PatientList$: Observable<any[]>;

  currentDate = new Date();

  @Input() Patient: any;
  id: number = 0;
  phone: string = '';

  constructor(
    private patientService: PatientService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.id = this.Patient.id;
    this.phone = this.Patient.phone;
    this.PatientList$ = this.patientService.getPatientApi();
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(date: Date) {
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  addEmegenceyPatient() {
    var mypatient = {
      phone: this.phone,
      firstName: 'Emergency',
      middleName: 'Emergency',
      lastName: 'Emergency',
      dateOfBirth: this.formatDate(this.currentDate).toString(),
      age: 0,
      email: 'emergency@gmail.com',
      educationLevelId: 1,
      address: 'Emergency',
      countryId: 1,
      cityId: 1,
      genderId: 1,
      maritalStatusId: 1,
      languageId: 1,
      is_decessed: true,
      bloodGroupId: 14,
    };

    console.log(mypatient);
    this.patientService.addPatientApi(mypatient).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.phone + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('emergency-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.PatientList$ = this.patientService.getPatientApi();
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
}
