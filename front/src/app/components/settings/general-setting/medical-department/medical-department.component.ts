import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
@Component({
  selector: 'app-medical-department',
  templateUrl: './medical-department.component.html',
  styleUrls: ['./medical-department.component.css'],
})
export class MedicalDepartmentComponent implements OnInit {
  medicalDepartmentList$: any;
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];
  constructor(
    private medicalDepartmentService: SettingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    //this.medicalDepartmentList$= this.medicalDepartmentService.getMedicalDepartmentApiEndpointApi();
    this.getMedicalDepartment();
  }
  modalTitle: string = '';
  activateMedicalDepartmentComponent: boolean = false;
  medicalDepartmentList: any;
  getMedicalDepartment() {
    this.medicalDepartmentService
      .getMedicalDepartmentApi()
      .subscribe((response) => {
        this.medicalDepartmentList$ = response;
      });
  }
  modalAdd() {
    this.medicalDepartmentList = {
      id: 0,
      name: null,
      description: null,
    };
    this.modalTitle = 'Add Medical department';
    this.activateMedicalDepartmentComponent = true;
  }

  modalEdit(item: any) {
    this.medicalDepartmentList = item;
    this.modalTitle = 'Edit Medical department';
    this.activateMedicalDepartmentComponent = true;
  }
  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete Medical department ${item.id}`)
    ) {
      this.medicalDepartmentService
        .deleteMedicalDepartmentApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getMedicalDepartment();
        });
    }
  }
  modalClose() {
    this.activateMedicalDepartmentComponent = false;
    //
    this.getMedicalDepartment();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalDepartment();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalDepartment();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalDepartmentList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.medicalDepartmentList.sort(
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
