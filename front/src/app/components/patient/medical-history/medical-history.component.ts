import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history.component.html',
  styleUrls: ['./medical-history.component.css'],
})
export class MedicalHistoryComponent implements OnInit {
  medicalHistoryList$: any;
  patientList$: any;
  admissionId: any;
  admissionList: any;

  // Variables (properties)
  modalTitle: string = '';
  activateMedicalHistoryComponent: boolean = false;
  medicalHistoryList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'medical-history.xlsx';
  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();

  constructor(
    private medicalHistoryService: LaboratoryService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
    this.getMedicalHistoryList();
    this.getPatientNameMap();
  }

  getMedicalHistoryList() {
    this.medicalHistoryService.getMedicalHistoryApi().subscribe((response) => {
      this.medicalHistoryList$ = response.filter(
        (responsiblePerson: { patientId: number }) =>
          responsiblePerson.patientId == this.admissionList.patientId
      );
    });
  }

  getPatientNameMap() {
    this.employeeService.getPatientApi().subscribe((data) => {
      this.patientList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.patientListMap.set(
          this.patientList$[i].id,
          this.patientList$[i].firstName +
            ' ' +
            this.patientList$[i].lastName +
            ` (${this.patientList$[i].id})`
        );
      }
    });
  }

  modalAdd() {
    this.medicalHistoryList = {
      id: 0,
      disease: null,
      treatment: null,
      riskFactor: null,
      description: null,
    };
    this.modalTitle = 'Add Medical History ';
    this.activateMedicalHistoryComponent = true;
  }

  modalEdit(item: any) {
    this.medicalHistoryList = item;
    this.modalTitle = 'Edit Medical History ';
    this.activateMedicalHistoryComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete medical history  ${item.id}`)
    ) {
      this.medicalHistoryService
        .deleteMedicalHistoryApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.medicalHistoryList.disease + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('medical-history-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getMedicalHistoryList();
        });
    }
  }

  modalClose() {
    this.activateMedicalHistoryComponent = false;
    this.getMedicalHistoryList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalHistoryList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalHistoryList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalHistoryList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('medical-history-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
