import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BedService } from 'src/app/services/bed.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-schedule-form',
  templateUrl: './patient-schedule-form.component.html',
  styleUrls: ['./patient-schedule-form.component.css'],
})
export class PatientScheduleFormComponent implements OnInit {
  patientScheduleList$: any;
  admissionTypeId$: any;
  roomId$: any;
  employeeId$: any;
  scheduleStatusId$: any;
  patientId$: any;
  appointmentDurationList$: any;
  appointmentDurationId$: any;
  weekDayList$: any;

  doctorSchedule: any = [];

  //Mapping forign key
  appointmentDurationMap: Map<number, string> = new Map();
  weekDayMap: Map<number, string> = new Map();

  constructor(
    private patientScheduleService: PatientService,
    private scheduleStatusService: LaboratoryService,
    private empService: EmployeeService,
    private roomService: BedService,
    private toast: NgToastService
  ) {}

  @Input() patientScheduleList: any;
  id: number = 0;
  patientId: number = 0;
  admissionTypeId: number = 0;
  roomId: number = 0;
  employeeId: string = '';
  is_Payed: string = '';
  is_Dismissed: string = '';
  timeStamp: string = '';
  scheduleDate: string = '';
  scheduleTime: string = '';
  statues: string = '';
  scheduleStatusId: number = 0;
  appointmentDurationId: number = 0;

  ngOnInit(): void {
    this.id = this.patientScheduleList.id;
    this.admissionTypeId = this.patientScheduleList.admissionTypeId;
    this.patientId = this.patientScheduleList.patientId;
    this.roomId = this.patientScheduleList.roomId;
    this.employeeId = this.patientScheduleList.employeeId;
    this.is_Payed = this.patientScheduleList.is_Payed;
    this.is_Dismissed = this.patientScheduleList.is_Dismissed;
    this.timeStamp = this.patientScheduleList.timeStamp;
    this.scheduleDate = this.patientScheduleList.scheduleDate;
    this.statues = this.patientScheduleList.statues;
    this.scheduleTime = this.patientScheduleList.scheduleTime;
    this.scheduleStatusId = this.patientScheduleList.scheduleStatusId;
    this.appointmentDurationId = this.patientScheduleList.appointmentDurationId;

    this.patientScheduleList$ =
      this.patientScheduleService.getPatientScheduleApi();
    this.patientId$ = this.patientScheduleService.getPatientApi();
    this.roomId$ = this.roomService.getRoomApi();
    this.scheduleStatusId$ = this.scheduleStatusService.getScheduleStatusApi();
    this.admissionTypeId$ = this.empService.getAdmissionTypeApi();
    this.appointmentDurationId$ = this.empService.getAppointmentDurationApi();
    this.getDoctorOnly();
  }

  getDoctorOnly() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.employeeId$ = res.filter(
        (roleId: { employeeRoleId: number }) => roleId.employeeRoleId == 3
      );
    });
  }
  getDoctorSchedule() {
    const selectedEmpId = +this.employeeId;
    this.patientScheduleService.getScheduleApi().subscribe((res) => {
      this.doctorSchedule = res.filter(
        (employee: { employeeId: number }) =>
          employee.employeeId == selectedEmpId
      );
      this.getAppointmentDurationMap();
      this.getWeekDayMap();
    });
  }

  getAppointmentDurationMap() {
    this.empService.getAppointmentDurationApi().subscribe((response) => {
      this.appointmentDurationList$ = response;
      for (let i = 0; i < response.length; i++) {
        this.appointmentDurationMap.set(
          this.appointmentDurationList$[i].id,
          this.appointmentDurationList$[i].name
        );
      }
    });
  }
  getWeekDayMap() {
    this.patientScheduleService.getWeekDayApi().subscribe((response) => {
      this.weekDayList$ = response;
      for (let i = 0; i < response.length; i++) {
        this.weekDayMap.set(this.weekDayList$[i].id, this.weekDayList$[i].name);
      }
    });
  }

  addPatientSchedule() {
    var patientScheduleList = {
      patientId: +this.patientId,
      admissionTypeId: +this.admissionTypeId,
      roomId: +this.roomId,
      employeeId: +this.employeeId,
      is_Payed: this.is_Payed == 'true' ? true : false,
      is_Dismissed: this.is_Dismissed == 'true' ? true : false,
      timeStamp: this.timeStamp,
      scheduleDate: this.scheduleDate,
      scheduleTime: this.scheduleTime,
      statues: this.statues,
      scheduleStatusId: +this.scheduleStatusId,
      appointmentDurationId: +this.appointmentDurationId,
    };
    console.log(patientScheduleList);
    this.patientScheduleService
      .addPatientScheduleApi(patientScheduleList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.patientScheduleList$ =
            this.patientScheduleService.getPatientScheduleApi();
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

  updatePatientSchedule() {
    var patientScheduleList = {
      id: this.id,
      patientId: +this.patientId,
      admissionTypeId: +this.admissionTypeId,
      roomId: +this.roomId,
      employeeId: +this.employeeId,
      is_Payed: true,
      is_Dismissed: this.is_Dismissed == 'true' ? true : false,
      timeStamp: this.timeStamp,
      scheduleDate: this.scheduleDate,
      scheduleTime: this.scheduleTime,
      statues: this.statues,
      scheduleStatusId: +this.scheduleStatusId,
      appointmentDurationId: +this.appointmentDurationId,
    };
    var id: number = this.id;
    console.log(patientScheduleList);

    this.patientScheduleService
      .updatePatientScheduleApi(id, patientScheduleList)
      .subscribe(
        (res) => {
          this.addNotification();
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.patientScheduleList$ =
            this.patientScheduleService.getPatientScheduleApi();
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
  date = new Date().toString();
  addNotification() {
    var notificationList = {
      date: this.date,
      status: false,
      heading: 'Confirmed',
      description: 'The doctor says comfirmed!!',
    };
    console.log(notificationList);
    this.empService.addNotificationMessageApi(notificationList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
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
}
