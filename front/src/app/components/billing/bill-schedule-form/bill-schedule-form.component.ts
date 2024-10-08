import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bill-schedule-form',
  templateUrl: './bill-schedule-form.component.html',
  styleUrls: ['./bill-schedule-form.component.css'],
})
export class BillScheduleFormComponent implements OnInit {
  fileName = 'bill-schedule.xlsx';
  billSchedulesList$!: Observable<any[]>;
  getPatientScheduleIdList$!: Observable<any[]>;
  getEmployeeList$!: Observable<any[]>;
  getServiceChargeIdList$!: Observable<any[]>;
  constructor(
    private billSchedulesService: BillingService,
    private employeeService: EmployeeService,
    private patientScheduleService: PatientService,

    private toast: NgToastService
  ) {}
  @Input() billSchedulesList: any;
  id: number = 0;
  serviceChargeId: number = 0;
  date: string = '';
  patientScheduleId: number = 0;
  employeeId: number = 0;

  ngOnInit(): void {
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.billSchedulesList$ = this.billSchedulesService.getBillScheduleApi();
    this.getPatientScheduleIdList$ =
      this.patientScheduleService.getPatientScheduleApi();
    this.getServiceChargeIdList$ =
      this.billSchedulesService.getServiceChargeApi();
    this.id = this.billSchedulesList.id;
    this.serviceChargeId = this.billSchedulesList.serviceChargeId;
    this.patientScheduleId = this.billSchedulesList.patientScheduleId;
    this.date = this.billSchedulesList.date;
    this.employeeId = this.billSchedulesList.employeeId;
  }
  addBillSchedules() {
    var billSchedulesList = {
      serviceChargeId: +this.serviceChargeId,
      date: this.date,
      patientScheduleId: +this.patientScheduleId,
      // patientScheduleId: 2,
      employeeId: +this.employeeId,
    };
    console.log(billSchedulesList);
    this.billSchedulesService.addBillScheduleApi(billSchedulesList).subscribe(
      (res) => {
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
      patientScheduleId: +this.patientScheduleId,
      employeeId: +this.employeeId,
    };
    var id: number = this.id;
    this.billSchedulesService
      .updateBillScheduleApi(id, billschedules)
      .subscribe(
        (res) => {
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
