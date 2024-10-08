import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-medical-interview-allergies',
  templateUrl: './medical-interview-allergies.component.html',
  styleUrls: ['./medical-interview-allergies.component.css'],
})
export class MedicalInterviewAllergiesComponent implements OnInit {
  medicalInterviewList$: any;
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
    this.getMedicalInterview();
  }
  modalTitle: string = '';
  activatemedicalinterviewallergiesComponent: boolean = false;
  medicalInterviewList: any;
  getMedicalInterview() {
    this.patientService
      .getMedicalInterviewAllergyApi()
      .subscribe((response) => {
        this.medicalInterviewList$ = response;
      });
  }
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
    this.medicalInterviewList = {
      id: 0,
      allergyId: null,
      patientId: null,
      throatSwelling: null,
      puffFace: null,
      troubleBreathing: null,
      description: null,
      other: null,
    };
    this.modalTitle = 'Add Medical Interview Allergies';
    this.activatemedicalinterviewallergiesComponent = true;
  }

  modalEdit(item: any) {
    this.medicalInterviewList = item;
    this.modalTitle = 'Edit Medical Interview Allergies';
    this.activatemedicalinterviewallergiesComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete medical interview allergies ${item.id}`
      )
    ) {
      this.patientService
        .deleteMedicalInterviewAllergyApi(item.id)
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
          this.getMedicalInterview();
        });
    }
  }
  modalClose() {
    this.activatemedicalinterviewallergiesComponent = false;
    //
    this.getMedicalInterview();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicalInterview();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicalInterview();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medicalInterviewList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.medicalInterviewList.sort(
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
