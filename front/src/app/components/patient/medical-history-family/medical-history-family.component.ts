import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-medical-history-family',
  templateUrl: './medical-history-family.component.html',
  styleUrls: ['./medical-history-family.component.css'],
})
export class MedicalHistoryFamilyComponent implements OnInit {
  medicalHistoryFamilyList$: any;
  patientID$: any;
  patientNameMap: Map<number, string> = new Map();
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
    private toast: NgToastService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.getPatientNameMap();
    this.getMedicalHistoryFamily();
  }
  getMedicalHistoryFamily() {
    this.patientService.getMedicalHistoryFamilyApi().subscribe((response) => {
      this.medicalHistoryFamilyList$ = response;
    });
  }
  modalTitle: string = '';
  activatmedicalHistoryFamilyComponent: boolean = false;
  medicalHistoryFamilyList: any;
  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((res) => {
      this.patientID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.patientNameMap.set(
          this.patientID$[i].id,
          this.patientID$[i].firstName +
            ' ' +
            this.patientID$[i].lastName +
            ` (${this.patientID$[i].id})`
        );
      }
    });
  }
  modalAdd() {
    this.medicalHistoryFamilyList = {
      id: 0,
      patientId: null,
      familyDisease: null,
      deceasedFamily: null,
      description: null,
    };
    this.modalTitle = 'Add Medical History Family';
    this.activatmedicalHistoryFamilyComponent = true;
  }

  modalEdit(item: any) {
    this.medicalHistoryFamilyList = item;
    this.modalTitle = 'Edit Medical History Family';
    this.activatmedicalHistoryFamilyComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete Medical History Family ${item.id}`
      )
    ) {
      this.patientService
        .deleteMedicalHistoryFamilyApi(item.id)
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
          this.getMedicalHistoryFamily();
        });
    }
  }
  modalClose() {
    this.activatmedicalHistoryFamilyComponent = false;
    //
    this.getMedicalHistoryFamily();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalHistoryFamily();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalHistoryFamily();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalHistoryFamilyList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.medicalHistoryFamilyList.sort(
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
