import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css'],
})
export class CaseComponent implements OnInit {
  CaseList$: any = [];
  patientList$: any = [];

  // Variables (properties)
  modalTitle: string = '';
  activateCaseComponent: boolean = false;
  CaseList: any;
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

  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();
  admissionId: any;
  admissionList: any;

  constructor(
    private CaseService: PatientService,
    private employeeService: EmployeeService,
    private admissionService: AdmissionService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
    this.getCaseList();
    this.getPatientNameMap();
  }

  getCaseList() {
    this.CaseService.getCaseApi().subscribe((response) => {
      this.CaseList$ = response.filter(
        (patientCase: { patientId: number }) =>
          patientCase.patientId == this.admissionList.patientId
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
    this.CaseList = {
      id: 0,
      date: null,
      patientId: null,
      title: null,
      caseDetail: null,
    };
    this.modalTitle = 'Add Patient Case';
    this.activateCaseComponent = true;
  }

  modalEdit(item: any) {
    this.CaseList = item;
    this.modalTitle = 'Edit Patient Case';
    this.activateCaseComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete patient case ${item.id}`)) {
      this.CaseService.deleteCaseApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        this.getCaseList();
      });
    }
  }

  modalClose() {
    this.activateCaseComponent = false;
    this.getCaseList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getCaseList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCaseList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.CaseList$.filter((res: any) => {
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
}
