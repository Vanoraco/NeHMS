import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-patient-schedule',
  templateUrl: './patient-schedule.component.html',
  styleUrls: ['./patient-schedule.component.css'],
})
export class PatientScheduleComponent implements OnInit {
  patientScheduleList$: any = [];
  patientId: any;
  employeeId: any;
  patientListMap: Map<number, string> = new Map();
  employeeListMap: Map<number, string> = new Map();
  fileName = 'patient_schedule.xlsx';
  // Variables (properties)
  id: number;
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  modalTitle: string = '';
  activatePatientScheduleComponent: boolean = false;
  patientScheduleList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  // Map to display data associate with foreign keys
  constructor(
    private patientService: PatientService,
    private empService: EmployeeService,
    public router: Router,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPatientScheduleList();
    this.getPatientNameMap();
    this.getEmployeeNameMap();

    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.empService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
      this.getEmployeeRole(this.employee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.empService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.employeeRole = data;
    });
  }

  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((data) => {
      this.patientId = data;
      for (let i = 0; i < data.length; i++) {
        this.patientListMap.set(
          this.patientId[i].id,
          this.patientId[i].firstName + ' ' + this.patientId[i].lastName
        );
      }
    });
  }

  getEmployeeNameMap() {
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeId = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeListMap.set(
          this.employeeId[i].id,
          this.employeeId[i].firstName + ' ' + this.employeeId[i].lastName
        );
      }
    });
  }

  getPatientScheduleList() {
    this.patientService.getPatientScheduleApi().subscribe((response) => {
      // response = response.filter()
      this.patientScheduleList$ = response;

      this.patientScheduleList$.sort(function (a: number, b: number) {
        return a - b;
      });
    });
  }

  modalAdd() {
    this.patientScheduleList = {
      id: 0,
      patientId: 0,
      admissionTypeId: 0,
      roomId: 0,
      employeeId: null,
      is_Payed: null,
      is_Dismissed: null,
      timeStamp: null,
      scheduleDate: null,
      scheduleTime: null,
      statues: null,
      scheduleStatusId: 0,
      appointmentDurationId: 0,
    };
    this.modalTitle = 'Add patient schedule';
    this.activatePatientScheduleComponent = true;
  }

  modalEdit(item: any) {
    this.patientScheduleList = item;
    this.modalTitle = 'Edit patient schedule';
    this.activatePatientScheduleComponent = true;
  }
  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete patient schedule ${item.id}`)
    ) {
      this.patientService.deletePatientScheduleApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary:
            this.patientScheduleList.admissionTypeId + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none';
          }
        }, 4000);
        this.getPatientScheduleList();
      });
    }
  }

  modalClose() {
    this.activatePatientScheduleComponent = false;
    this.getPatientScheduleList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPatientScheduleList();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPatientScheduleList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.patientScheduleList$.filter((res: any) => {
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
    let element = document.getElementById('patient-sch-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
