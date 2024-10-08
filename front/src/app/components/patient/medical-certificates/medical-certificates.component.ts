import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-medical-certificates',
  templateUrl: './medical-certificates.component.html',
  styleUrls: ['./medical-certificates.component.css'],
})
export class MedicalCertificatesComponent implements OnInit {
  medicalCertificateList$: any = [];
  employeeList$: any;
  employeeID$: any;
  employeeNameMap: Map<number, string> = new Map();
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
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private medicalCertificatesService: PatientService
  ) { }

  ngOnInit(): void {
    this.employeeList$ = this.employeeService.getEmployeeApi();
    this.getEmployeeNameMap();
    this.getMedicalCertificate();
  }
  modalTitle: string = '';
  activateMedicalCertificateComponent: boolean = false;
  medicalCertificateList: any;
  activateMedicalCertificate: boolean = false;
  medicalCertificate: any;

  getMedicalCertificate() {
    this.medicalCertificatesService
      .getMedicalCertificateApi()
      .subscribe((response) => {
        this.medicalCertificateList$ = response;
      });
  }
  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.employeeNameMap.set(
          this.employeeID$[i].id,
          this.employeeID$[i].firstName +
          ' ' +
          this.employeeID$[i].lastName +
          ` (${this.employeeID$[i].id})`
        );
      }
    });
  }
  modalAdd() {
    this.medicalCertificateList = {
      id: 0,
      employeeId: null,
      startDate: null,
      endDate: null,
      numberOfDate: null,
      timeStamp: null,
      description: null,
    };
    this.modalTitle = 'Add Medical Certificate';
    this.activateMedicalCertificateComponent = true;
  }
  modalPrint(item: any) {
    this.medicalCertificate = item;
    this.modalTitle = 'Medical Certificate';
    this.activateMedicalCertificate = true;
  }
  modalEdit(item: any) {
    this.medicalCertificateList = item;
    this.modalTitle = 'Edit  Medical Certificates';
    this.activateMedicalCertificateComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete medical certificates ${item.id}`
      )
    ) {
      this.medicalCertificatesService
        .deleteMedicalCertificateApi(item.id)
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
          this.getMedicalCertificate();
        });
    }
  }
  modalClose() {
    this.activateMedicalCertificateComponent = false;
    //
    this.getMedicalCertificate();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalCertificate();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalCertificate();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalCertificateList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.medicalCertificateList.sort(
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
