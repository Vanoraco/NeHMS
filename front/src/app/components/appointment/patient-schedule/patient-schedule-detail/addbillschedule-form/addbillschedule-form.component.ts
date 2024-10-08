import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-addbillschedule-form',
  templateUrl: './addbillschedule-form.component.html',
  styleUrls: ['./addbillschedule-form.component.css'],
})
export class AddbillscheduleFormComponent implements OnInit {
  billSchedulesList$!: Observable<any[]>;
  patientScheduleList$!: any;
  employeeList$!: any;
  getServiceChargeIdList$!: Observable<any[]>;
  patientScheduleIdParams: number;
  constructor(
    private billSchedulesService: BillingService,
    private employeeService: EmployeeService,
    private patientScheduleService: PatientService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}
  @Input() billSchedulesList: any;
  id: number = 0;
  serviceChargeId: number = 0;
  date: string = '';
  patientScheduleId: number = 0;
  employeeId: number = 0;

  ngOnInit(): void {
    this.patientScheduleIdParams =
      this.route.snapshot.params['patientScheduleId'];
    this.patientScheduleService
      .getPatientScheduleByIdApi(this.patientScheduleIdParams)
      .subscribe((res) => {
        this.patientScheduleList$ = res;
      });
    this.billSchedulesList$ = this.billSchedulesService.getBillScheduleApi();
    this.getServiceChargeIdList$ =
      this.billSchedulesService.getServiceChargeApi();
    this.id = this.billSchedulesList.id;
    this.date = this.billSchedulesList.date;
    this.employeeId = this.billSchedulesList.employeeId;
    this.getEmployee();
  }

  getEmployee() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeList$ = res.filter(
        (roleId: { employeeRoleId: number }) => roleId.employeeRoleId == 7
      );
    });
  }
  updatePatientSchedule() {
    var patientScheduleList = {
      id: this.patientScheduleList$.id,
      patientId: +this.patientScheduleList$.patientId,
      admissionTypeId: +this.patientScheduleList$.admissionTypeId,
      roomId: +this.patientScheduleList$.roomId,
      employeeId: +this.patientScheduleList$.employeeId,
      is_Payed: true,
      is_Dismissed: this.patientScheduleList$.is_Dismissed,
      timeStamp: this.patientScheduleList$.timeStamp,
      scheduleDate: this.patientScheduleList$.scheduleDate,
      scheduleTime: this.patientScheduleList$.scheduleTime,
      statues: this.patientScheduleList$.statues,
      scheduleStatusId: +this.patientScheduleList$.scheduleStatusId,
      appointmentDurationId: +this.patientScheduleList$.appointmentDurationId,
    };
    var id: number = this.patientScheduleList$.id;
    console.log(patientScheduleList);

    this.patientScheduleService
      .updatePatientScheduleApi(id, patientScheduleList)
      .subscribe((res) => {
        console.log(res);
      });
  }
  addBillSchedules() {
    var billSchedulesList = {
      serviceChargeId: +this.serviceChargeId,
      date: this.date,
      patientScheduleId: +this.patientScheduleList$.id,
      employeeId: +this.employeeId,
    };
    console.log(billSchedulesList);
    this.billSchedulesService.addBillScheduleApi(billSchedulesList).subscribe(
      (res) => {
        this.updatePatientSchedule();
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
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
  updateBillSchedules() {
    var billschedules = {
      id: this.id,
      serviceChargeId: +this.serviceChargeId,
      date: this.date,
      patientScheduleId: +this.patientScheduleList$.id,
      employeeId: +this.patientScheduleList$.employeeId,
    };
    var id: number = this.id;
    this.billSchedulesService
      .updateBillScheduleApi(id, billschedules)
      .subscribe(
        (res) => {
          this.updatePatientSchedule();
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
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
