import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Table } from 'primeng/table';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  PatientList$!: any;
  fileName = 'patient.xlsx';
  imageApiPath = environment.imageUrl;
  loading: boolean = true;
  activityValues: number[] = [0, 100];

  constructor(
    private patientService: PatientService,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.getPatient();
  }
  modalTitle: string = '';
  activateAddEditPatientComponent: boolean = false;
  Patient: any;

  public createImgPath = (serverPath: string) => {
    return this.imageApiPath + serverPath;
  };

  getPatient() {
    this.patientService.getPatientApi().subscribe((response) => {
      this.PatientList$ = response.reverse();
      this.loading = false;
    });
  }

  modalAdd() {
    this.Patient = {
      id: 0,
      firstName: null,
      middleName: null,
      lastName: null,
      dateOfBirth: null,
      age: 0,
      phone: null,
      email: null,
      address: null,
      genderId: null,
      maritalStatusId: null,
      languageId: null,
      educationLevelId: null,
      countryId: null,
      cityId: null,
      imageUrl: null,
      is_decessed: true,
      bloodGroupId: null,
    };
    this.modalTitle = 'Add Paitent';
    this.activateAddEditPatientComponent = true;
  }

  modalAddEmergency() {
    this.Patient = {
      id: 0,
      firstName: null,
      middleName: null,
      lastName: null,
      dateOfBirth: null,
      age: 0,
      phone: null,
      email: null,
      address: null,
      genderId: null,
      maritalStatusId: null,
      languageId: null,
      educationLevelId: null,
      countryId: null,
      cityId: null,
      imageUrl: null,
      is_decessed: true,
      bloodGroupId: null,
    };
    this.modalTitle = 'Add Paitent';
    this.activateAddEditPatientComponent = true;
  }

  modalEmrEdit(item: any) {
    this.Patient = item;
    this.modalTitle = 'Edit Patient';
    this.activateAddEditPatientComponent = true;
  }

  modalEdit(item: any) {
    this.Patient = item;
    this.modalTitle = 'Edit Patient';
    this.activateAddEditPatientComponent = true;
  }
  delete(item: any) {
    if (confirm(`Are you sure you want to delete Patient ${item.id}`)) {
      this.patientService.deletePatientApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary:
            item.firstName + ' ' + item.lastName + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getPatient();
      });
    }
  }
  modalClose() {
    this.activateAddEditPatientComponent = false;
    this.getPatient();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('patient-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
  clear(table: Table) {
    table.clear();
}
}
