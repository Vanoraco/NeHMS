import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medical-interview-socrates',
  templateUrl: './medical-interview-socrates.component.html',
  styleUrls: ['./medical-interview-socrates.component.css'],
})
export class MedicalInterviewSocratesComponent implements OnInit {
  medicalInterviewSocratesList$: any;
  patientList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateMedicalInterviewSocratesComponent: boolean = false;
  medicalInterviewSocratesList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';0
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'medical-interview-socrates.xlsx';
  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();

  constructor(
    private medicalInterviewSocratesService: LaboratoryService,
    private patientService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getMedicalInterviewSocratesList();
    this.getPatientNameMap();
  }

  getMedicalInterviewSocratesList() {
    this.medicalInterviewSocratesService
      .getMedicalInterviewSocratesApi()
      .subscribe((response) => {
        this.medicalInterviewSocratesList$ = response;
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
    this.medicalInterviewSocratesList = {
      id: 0,
      patientId: 0,
      painOnSetSide: null,
      painOnSetSuddenGradual: null,
      painOnSetProgressiveRgressive: null,
      painOnSetSideDuration: null, //date
      painCharacteristics: null,
      painRadiation: null,
      painAssociation: null,
      painTimeCourse: null, //date
      painExacerbatingRelivingFactor: null,
      painSeverity: null,
    };
    this.modalTitle = 'Add Medical Interview Socrates';
    this.activateMedicalInterviewSocratesComponent = true;
  }

  modalEdit(item: any) {
    this.medicalInterviewSocratesList = item;
    this.modalTitle = 'Edit Medical Interview Socrates';
    this.activateMedicalInterviewSocratesComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete medical interview socrates ${item.id}`
      )
    ) {
      this.medicalInterviewSocratesService
        .deleteMedicalInterviewSocratesApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary:
              this.medicalInterviewSocratesList.symptom +
              ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getMedicalInterviewSocratesList();
        });
    }
  }
  modalClose() {
    this.activateMedicalInterviewSocratesComponent = false;
    this.getMedicalInterviewSocratesList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalInterviewSocratesList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalInterviewSocratesList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalInterviewSocratesList$.filter((res: any) => {
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
    let element = document.getElementById('medical-int-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
