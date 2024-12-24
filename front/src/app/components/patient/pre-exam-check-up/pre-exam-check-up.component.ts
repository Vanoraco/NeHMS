import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pre-exam-check-up',
  templateUrl: './pre-exam-check-up.component.html',
  styleUrls: ['./pre-exam-check-up.component.css'],
  // pipes: [ReversePipe]
})
export class PreExamCheckUpComponent implements OnInit {
  preexamcheckupList$: any;
  // Map to display data associate with foreign keys
  employeeID$: any;
  employeeNameMap: Map<number, string> = new Map();
  searchName: string = '';
  userRole: string;
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private preExamcheckupService: PatientService
  ) {}

  ngOnInit(): void {
     const storedData = localStorage.getItem('Role');

    if (storedData) {
      
      this.userRole = storedData;
      
      console.log(this.userRole) // Assuming 'role' is stored in the patientData object
    }
    this.getEmployeeNameMap();
    this.getPreexamCheckup();
  }

  // Variables (properties)
  modalTitle: string = '';
  activatepreexamcheckupComponent: boolean = false;
  preexamcheckupList: any;
  AdmissionId: number;

  getPreexamCheckup() {
    this.AdmissionId = this.route.snapshot.params['admissionId'];
    this.preExamcheckupService.getPreExamCheckupApi().subscribe((response) => {
      this.preexamcheckupList$ = response.filter(
        (preexamcheckupList: { admissionId: number }) =>
          preexamcheckupList.admissionId == this.AdmissionId
      );
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
    this.preexamcheckupList = {
      id: 0,
      employeeId: null,
      admissionId: null,
      height: 0,
      weight: 0,
      pain: null,
      bp: null,
      symptom: null,
      severity: null,
      visualAcuity: null,// e.g., "20/20"
      intraocularPressure: 0
    };
    this.modalTitle = 'Add Pre Exam Checkup';
    this.activatepreexamcheckupComponent = true;
  }

  modalEdit(item: any) {
    this.preexamcheckupList = item;
    this.modalTitle = 'Edit Pre Exam Checkup';
    this.activatepreexamcheckupComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete Pre Exam Checkup ${item.id}`)
    ) {
      this.preExamcheckupService
        .deletePreExamCheckupApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: ' Sucessfully Deleted!',
            duration: 4000,
          });
          this.getPreexamCheckup();
        });
    }
  }
  modalClose() {
    this.activatepreexamcheckupComponent = false;
    this.getPreexamCheckup();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getPreexamCheckup();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPreexamCheckup();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.preexamcheckupList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.preexamcheckupList.sort(
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
