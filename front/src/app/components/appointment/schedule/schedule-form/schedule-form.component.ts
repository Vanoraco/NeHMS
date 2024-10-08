import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css'],
})
export class ScheduleFormComponent implements OnInit {
  scheduleList$!: any;
  employeeId$: any = [];
  weekdayId$!: Observable<any[]>;
  appointmentDurationId$!: Observable<any[]>;

  constructor(
    private scheduleService: PatientService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() scheduleList: any;
  id: number = 0;
  startingTime: string = '';
  finishingTime: string = '';
  employeeId: number = 0;
  weekdayId: number = 0;
  appointmentDurationId: number = 0;

  ngOnInit(): void {
    this.id = this.scheduleList.id;
    this.startingTime = this.scheduleList.startingTime;
    this.finishingTime = this.scheduleList.finishingTime;
    this.employeeId = this.scheduleList.employeeId;
    this.weekdayId = this.scheduleList.weekdayId;
    this.appointmentDurationId = this.scheduleList.appointmentDurationId;

    this.getEmployee();
    this.getAllSchedules();
    this.weekdayId$ = this.scheduleService.getWeekDayApi();
    this.appointmentDurationId$ =
      this.employeeService.getAppointmentDurationApi();
  }

  getEmployee() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeId$ = res.filter(
        (roleId: { employeeRoleId: number }) => roleId.employeeRoleId == 3
      );
    });
  }
  getAllSchedules() {
    this.scheduleService.getScheduleApi().subscribe((res) => {
      this.scheduleList$ = res;
    });
  }

  addSchedule() {
    var scheduleList = {
      startingTime: this.startingTime,
      finishingTime: this.finishingTime,
      employeeId: +this.employeeId,
      weekdayId: +this.weekdayId,
      appointmentDurationId: +this.appointmentDurationId,
    };
    this.scheduleService.addScheduleApi(scheduleList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.startingTime + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAllSchedules();
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updateSchedule() {
    var scheduleList = {
      id: this.id,
      startingTime: this.startingTime,
      finishingTime: this.finishingTime,
      employeeId: +this.employeeId,
      weekdayId: +this.weekdayId,
      appointmentDurationId: +this.appointmentDurationId,
    };
    var id: number = this.id;
    console.log(scheduleList);

    this.scheduleService.updateScheduleApi(id, scheduleList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Success',
          summary: this.startingTime + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAllSchedules();
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
}
