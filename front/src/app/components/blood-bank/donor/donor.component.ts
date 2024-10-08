import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css'],
})
export class DonorComponent implements OnInit {
  donorsList$: any = [];
  bloodGroupID$: any;
  genderID$: any;
  bloodGroupNameMap: Map<number, string> = new Map();
  genderNameMap: Map<number, string> = new Map();
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];
  donorsListD$: [any, any[], any];
  allData: any[];
  genderList$: any;
  constructor(
    private donorService: UtilityService,
    private toast: NgToastService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getBloodGroupNameMap();
    this.getChildGenderNameMap();
    this.getDonors();
  }

  getDonors() {
    this.donorService.getDonorApi().subscribe((response) => {
      this.donorsList$ = response;
    });
  }
  getGender() {
    this.employeeService.getGenders().subscribe((response) => {
      this.genderList$ = response;
    });
  }
  // Variables (properties)
  modalTitle: string = '';
  activatedonorsComponent: boolean = false;
  donorsList: any;

  getBloodGroupNameMap() {
    this.employeeService.getBloodGroupApi().subscribe((res) => {
      this.bloodGroupID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.bloodGroupNameMap.set(
          this.bloodGroupID$[i].id,
          this.bloodGroupID$[i].name
        );
      }
    });
  }
  getChildGenderNameMap() {
    this.employeeService.getGenders().subscribe((res) => {
      this.genderID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.genderNameMap.set(this.genderID$[i].id, this.genderID$[i].name);
      }
    });
  }

  modalAdd() {
    this.donorsList = {
      id: 0,
      firstName: null,
      middleName: null,
      lastName: null,
      genderId: 0,
      bloodGroupID: 0,
      address: null,
      phoneNumber: null,
      emailAddress: null,
      age: 0,
      unit: 0,
      lastDonated: null,
    };
    this.modalTitle = 'Add donors';
    this.activatedonorsComponent = true;
  }

  modalEdit(item: any) {
    this.donorsList = item;
    this.modalTitle = 'Edit donors';
    this.activatedonorsComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete donors ${item.id}`)) {
      this.donorService.deleteDonorApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getDonors();
      });
    }
  }
  modalClose() {
    this.activatedonorsComponent = false;
    //
    this.getDonors();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getDonors();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDonors();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.donorsList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.donorsList.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[key] < b[key]) {
          return -1 * direction;
        } else if (a[key] < b[key]) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    );
  }
}
