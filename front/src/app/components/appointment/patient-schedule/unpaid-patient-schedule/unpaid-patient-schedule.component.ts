import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-unpaid-patient-schedule',
  templateUrl: './unpaid-patient-schedule.component.html',
  styleUrls: ['./unpaid-patient-schedule.component.css'],
})
export class UnpaidPatientScheduleComponent implements OnInit {
  patientScheduleList$: any = [];
  scheduleStatus: any;
  employeeId: any;

  // Map to display data associate with foreign keys
  scheduleStatusListMap: Map<number, string> = new Map();
  employeeListMap: Map<number, string> = new Map();

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
  fileName = 'unpaid-patient-sch-report.xlsx';
  constructor(
    private shcStatusService: PatientService,
    private empService: EmployeeService,
    public router: Router,
    private scheduleStatusService: LaboratoryService,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPatientScheduleList();
    this.getScheduleStatusMap();
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

  getScheduleStatusMap() {
    this.scheduleStatusService.getScheduleStatusApi().subscribe((data) => {
      this.scheduleStatus = data;
      for (let i = 0; i < data.length; i++) {
        this.scheduleStatusListMap.set(
          this.scheduleStatus[i].id,
          this.scheduleStatus[i].name
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
    this.shcStatusService.getPatientScheduleApi().subscribe((response) => {
      this.patientScheduleList$ = response
        .filter(
          (patientScheduleData: { is_Payed: boolean }) =>
            patientScheduleData.is_Payed == false
        )
        .reverse();
    });
  }

  modalAdd() {
    this.patientScheduleList = {
      id: 0,
      patientId: null,
      admissionTypeId: null,
      roomId: null,
      employeeId: null,
      is_Payed: null,
      is_Dismissed: null,
      timeStamp: null,
      scheduleDate: null,
      scheduleTime: null,
      statues: null,
      scheduleStatusId: null,
      appointmentDurationId: null,
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
      this.shcStatusService
        .deletePatientScheduleApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary:
              this.patientScheduleList.admissionTypeId +
              ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
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
    let element = document.getElementById('unpaid-patient-sch-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
