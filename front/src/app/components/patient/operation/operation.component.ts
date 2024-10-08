import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css'],
})
export class OperationComponent implements OnInit {
  OperationList$: any = [];
  EmployeeList$: any = [];
  PatientList$: any = [];

  // Variables (properties)
  modalTitle: string = '';
  activateOperationComponent: boolean = false;
  operationList: any;
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
  EmployeeListMap: Map<number, string> = new Map();
  PatientListMap: Map<number, string> = new Map();

  AdmissionId: any;
  admissionList: any;

  constructor(
    private operationService: PatientService,
    private employeeService: EmployeeService,
    private admissionService: AdmissionService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.AdmissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.AdmissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
    this.getOperationList();
    this.getEmployeeNameMap();
    this.getPatientNameMap();
  }

  getOperationList() {
    this.operationService.getOperationApi().subscribe((response) => {
      this.OperationList$ = response.filter(
        (patientOperation: { patientId: number }) =>
          patientOperation.patientId == this.admissionList.patientId
      );
    });
  }

  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.EmployeeList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.EmployeeListMap.set(
          this.EmployeeList$[i].id,
          this.EmployeeList$[i].firstName +
            ' ' +
            this.EmployeeList$[i].lastName +
            ` (${this.EmployeeList$[i].id})`
        );
      }
    });
  }
  getPatientNameMap() {
    this.operationService.getPatientApi().subscribe((data) => {
      this.PatientList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.PatientListMap.set(
          this.PatientList$[i].id,
          this.PatientList$[i].firstName +
            ' ' +
            this.PatientList$[i].lastName +
            ` (${this.PatientList$[i].id})`
        );
      }
    });
  }

  modalAdd() {
    this.operationList = {
      id: 0,
      date: null,
      patientId: null,
      title: null,
      OperationDetail: null,
    };
    this.modalTitle = 'Add Patient Operation';
    this.activateOperationComponent = true;
    console.log('btn clicked');
  }

  modalEdit(item: any) {
    this.operationList = item;
    this.modalTitle = 'Edit Patient Operation';
    this.activateOperationComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete patient Operation ${item.id}`)
    ) {
      this.operationService.deleteOperationApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        this.getOperationList();
      });
    }
  }

  modalClose() {
    this.activateOperationComponent = false;
    this.getOperationList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getOperationList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getOperationList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.OperationList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerOperation()
          .match(res.searchName.toLocaleLowerOperation());
      });
    }
  }

  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
}
