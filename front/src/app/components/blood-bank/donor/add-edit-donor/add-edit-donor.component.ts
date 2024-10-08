import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-add-edit-donor',
  templateUrl: './add-edit-donor.component.html',
  styleUrls: ['./add-edit-donor.component.css'],
})
export class AddEditDonorComponent implements OnInit {
  donorsList$!: Observable<any[]>;
  genderList$!: Observable<any[]>;
  bloodGroupList$!: Observable<any[]>;
  constructor(
    private donorService: UtilityService,
    private toast: NgToastService,
    private employeeService: EmployeeService
  ) {}
  @Input() donorsList: any;
  id: number = 0;
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';
  genderId: number = 0;
  address: string = '';
  bloodGroupID: number = 0;
  phoneNumber: string = '';
  emailAddress: string = '';
  age: number = 0;
  unit: number = 0;
  lastDonated: string = '';
  ngOnInit(): void {
    this.bloodGroupList$ = this.employeeService.getBloodGroupApi();
    this.donorsList$ = this.donorService.getDonorApi();
    this.genderList$ = this.employeeService.getGenders();

    this.id = this.donorsList.id;
    this.firstName = this.donorsList.firstName;
    this.middleName = this.donorsList.middleName;
    this.lastName = this.donorsList.lastName;
    this.genderId = this.donorsList.genderId;
    this.address = this.donorsList.address;
    this.bloodGroupID = this.donorsList.bloodGroupID;
    this.phoneNumber = this.donorsList.phoneNumber;
    this.emailAddress = this.donorsList.emailAddress;
    this.age = this.donorsList.age;
    this.unit = this.donorsList.unit;
    this.lastDonated = this.donorsList.lastDonated;
  }

  addDonor() {
    var donorsList = {
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      genderId: +this.genderId,
      bloodGroupID: +this.bloodGroupID,
      address: this.address,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      age: +this.age,
      unit: +this.unit,
      lastDonated: this.lastDonated,
    };
    this.donorService.addDonorApi(donorsList).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: this.firstName + ' Sucessfully Added!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.donorsList$ = this.donorService.getDonorApi();
    });
  }
  updateDonor() {
    var donor = {
      id: this.id,
      firstName: this.firstName,
      middleName: this.middleName,
      lastName: this.lastName,
      genderId: +this.genderId,
      bloodGroupID: +this.bloodGroupID,
      address: this.address,
      phoneNumber: this.phoneNumber,
      emailAddress: this.emailAddress,
      age: +this.age,
      unit: +this.unit,
      lastDonated: this.lastDonated,
    };
    var id: number = this.id;
    this.donorService.updateDonorApi(id, donor).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: this.firstName + ' Sucessfully Updated!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.donorsList$ = this.donorService.getDonorApi();
    });
  }
}
