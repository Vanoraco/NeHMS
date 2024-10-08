import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-responsible-person-form',
  templateUrl: './responsible-person-form.component.html',
  styleUrls: ['./responsible-person-form.component.css'],
})
export class ResponsiblePersonFormComponent implements OnInit {
  responsiblePersonList$: any;
  countryList$: any;
  cityList$: any;
  relationshipList$: any;
  patientList$: any;

  constructor(
    private responsiblePersonService: PatientService,
    private dataServices: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() responsiblePersonList: any;
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  relationshipId: number = 0;
  countryId: number = 0;
  cityId: number = 0;
  patientId: number = 0;

  ngOnInit(): void {
    this.id = this.responsiblePersonList.id;
    this.firstName = this.responsiblePersonList.firstName;
    this.lastName = this.responsiblePersonList.lastName;
    this.phone = this.responsiblePersonList.phone;
    this.address = this.responsiblePersonList.address;
    this.relationshipId = this.responsiblePersonList.relationshipId;
    this.countryId = this.responsiblePersonList.countryId;
    this.cityId = this.responsiblePersonList.cityId;
    this.patientId = this.responsiblePersonList.patientId;
    this.responsiblePersonList$ =
      this.responsiblePersonService.getResponsiblePersonApi();
    this.patientList$ = this.responsiblePersonService.getPatientApi();
    this.relationshipList$ = this.responsiblePersonService.getRelationshipApi();
    this.countryList$ = this.dataServices.getCountries();
    this.cityList$ = this.dataServices.getCities();
  }

  addResponsiblePerson() {
    var responsiblePersonList = {
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      relationshipId: +this.relationshipId,
      countryId: +this.countryId,
      cityId: +this.cityId,
      patientId: +this.patientId,
    };
    console.log(responsiblePersonList);
    this.responsiblePersonService
      .addResponsiblePersonApi(responsiblePersonList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.firstName + ' Sucessfully Added!',
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
  updateResponsiblePerson() {
    var responsiblePersonList = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      relationshipId: +this.relationshipId,
      countryId: +this.countryId,
      cityId: +this.cityId,
      patientId: +this.patientId,
    };
    var id: number = this.id;
    console.log(responsiblePersonList);

    this.responsiblePersonService
      .updateResponsiblePersonApi(id, responsiblePersonList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.firstName + ' Sucessfully Updated!',
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
