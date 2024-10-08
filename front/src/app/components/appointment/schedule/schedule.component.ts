import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {

  scheduleList$: any = [];
  employeeList: any;
  weekDayList: any;
  @ViewChild(ScheduleComponent)
  appointmentDuration: any;

  // Variables (properties)
  modalTitle: string = '';
  activateScheduleComponent: boolean = false;
  schedules: any;
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

  //Mapping forign key
  employeeNameMap: Map<number, string> = new Map();
  appointmentDurationMap: Map<number, string> = new Map();
  weekDayMap: Map<number, string> = new Map();
  fileName = 'schedule.xlsx';
  constructor(
    private scheduleService: PatientService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getScheduleList();
    this.getEmployeeNameMap();
    this.getAppointmentDurationMap();
    this.getWeekDayMap();
  }

  getScheduleList() {
    this.scheduleService.getScheduleApi().subscribe((res) => {
      this.scheduleList$ = res;
    });
  }
  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((response) => {
      this.employeeList = response;
      for (let i = 0; i < response.length; i++) {
        this.employeeNameMap.set(
          this.employeeList[i].id,
          this.employeeList[i].firstName +
            ' ' +
            this.employeeList[i].lastName +
            ` (${this.employeeList[i].id})`
        );
      }
    });
  }
  getAppointmentDurationMap() {
    this.employeeService.getAppointmentDurationApi().subscribe((response) => {
      this.appointmentDuration = response;
      for (let i = 0; i < response.length; i++) {
        this.appointmentDurationMap.set(
          this.appointmentDuration[i].id,
          this.appointmentDuration[i].name
        );
      }
    });
  }
  getWeekDayMap() {
    this.scheduleService.getWeekDayApi().subscribe((response) => {
      this.weekDayList = response;
      for (let i = 0; i < response.length; i++) {
        this.weekDayMap.set(this.weekDayList[i].id, this.weekDayList[i].name);
      }
    });
  }

  modalAdd() {
    this.schedules = {
      id: 0,
      startingTime: null,
      finishingTime: null,
      employeeId: null,
      weekdayId: null,
      appointmentDurationId: null,
    };
    this.modalTitle = 'Add schedule';
    this.activateScheduleComponent = true;
  }

  modalEdit(item: any) {
    this.schedules = item;
    this.modalTitle = 'Edit schedule';
    this.activateScheduleComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete schedule ${item.id}`)) {
      this.scheduleService.deleteScheduleApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.scheduleList$ = this.scheduleService.getScheduleApi();
      });
    }
  }
  modalClose() {
    this.activateScheduleComponent = false;
    this.scheduleList$ = this.scheduleService.getScheduleApi();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getScheduleList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getScheduleList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.scheduleList$.filter((res: any) => {
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
    let element = document.getElementById('schedule-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
