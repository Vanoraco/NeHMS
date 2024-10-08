import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medical-history-drug',
  templateUrl: './medical-history-drug.component.html',
  styleUrls: ['./medical-history-drug.component.css'],
})
export class MedicalHistoryDrugComponent implements OnInit {
  medicalHistoryDrugList$: any;
  patientList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateMedicalHistoryDrugComponent: boolean = false;
  medicalHistoryDrugList: any;
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
  fileName = 'medical-history-drug.xlsx';
  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();

  constructor(
    private medicalHistoryDrugService: LaboratoryService,
    private patientService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getMedicalHistoryDrugList();
    this.getPatientNameMap();
  }

  getMedicalHistoryDrugList() {
    this.medicalHistoryDrugService
      .getMedicalHistoryDrugApi()
      .subscribe((response) => {
        this.medicalHistoryDrugList$ = response;
      });
  }

  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((data) => {
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
    this.medicalHistoryDrugList = {
      id: 0,
      symptom: null,
      patientId: 0,
      postMedication: null,
      recratioalDrug: null,
      intravenousDrug: null,
      otcDrug: null,
    };
    this.modalTitle = 'Add Medical History Drug';
    this.activateMedicalHistoryDrugComponent = true;
  }

  modalEdit(item: any) {
    this.medicalHistoryDrugList = item;
    this.modalTitle = 'Edit Medical History Drug';
    this.activateMedicalHistoryDrugComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete medical history drug ${item.id}`)
    ) {
      this.medicalHistoryDrugService
        .deleteMedicalHistoryDrugApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary:
              this.medicalHistoryDrugList.symptom + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          var showDeleteSuccess = document.getElementById(
            'delete-success-alert'
          );
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'block';
          }
          setTimeout(function () {
            if (showDeleteSuccess) {
              showDeleteSuccess.style.display = 'none';
            }
          }, 4000);
          this.getMedicalHistoryDrugList();
        });
    }
  }
  modalClose() {
    this.activateMedicalHistoryDrugComponent = false;
    this.getMedicalHistoryDrugList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalHistoryDrugList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalHistoryDrugList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalHistoryDrugList$.filter((res: any) => {
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
    let element = document.getElementById('medical-history-drug-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
