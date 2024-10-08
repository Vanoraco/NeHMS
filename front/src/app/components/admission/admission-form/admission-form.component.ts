import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { BedService } from 'src/app/services/bed.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-admission-form',
  templateUrl: './admission-form.component.html',
  styleUrls: ['./admission-form.component.css'],
})
export class AdmissionFormComponent implements OnInit {
  employeeId$: any = [];
  admissionTypeId$: any = [];
  roomId$: any = [];
  wardId$: any = [];
  admissionList$: Observable<any[]>;
  patientSchedule$: any = [];

  @Input() admissionList: any;

  id: number = 0;
  admissionTypeId: number = 0;
  patientId: number = 0;
  employeeId: number = 0;
  roomId: number = 0;
  wardId: number = 0;
  admissionTime: string = '';
  admissionDate: string = '';
  dischargeDate: string = '';
  isDischarge: string = '';

  constructor(
    private empService: EmployeeService,
    private patientService: PatientService,
    private bedService: BedService,
    private admissionService: AdmissionService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.id = this.admissionList.id;
    this.admissionTypeId = this.admissionList.admissionTypeId;
    this.employeeId = this.admissionList.employeeId;
    this.patientId = this.admissionList.patientId;
    this.roomId = this.admissionList.roomId;
    this.wardId = this.admissionList.wardId;
    this.admissionTime = this.admissionList.admissionTime;
    this.admissionDate = this.admissionList.admissionDate;
    this.dischargeDate = this.admissionList.dischargeDate;
    this.isDischarge = this.admissionList.isDischarge;

    this.wardId$ = this.bedService.getWardApi();
    this.admissionList$ = this.admissionService.getAdmissionApi();
    this.getPatientSchdule();
  }

  addAdmission() {
    var admissionList = {
      admissionTypeId: +this.admissionTypeId,
      patientId: +this.patientId,
      employeeId: +this.employeeId,
      roomId: +this.roomId,
      wardId: +this.wardId,
      admissionTime: this.admissionTime,
      admissionDate: this.admissionDate,
      dischargeDate: this.dischargeDate,
      isDischarge: this.isDischarge == 'True' ? true : false,
    };
    console.log(admissionList);
    this.admissionService.addAdmissionApi(admissionList).subscribe(
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
        this.admissionList$ = this.admissionService.getAdmissionApi();
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
  updateAdmission() {
    var admissionList = {
      id: this.id,
      admissionTypeId: +this.admissionTypeId,
      patientId: +this.patientId,
      employeeId: +this.employeeId,
      roomId: +this.roomId,
      wardId: +this.wardId,
      admissionTime: this.admissionTime,
      admissionDate: this.admissionDate,
      dischargeDate: this.dischargeDate,
      isDischarge: this.isDischarge == 'True' ? true : false,
    };
    var id: number = this.id;
    console.log('ID = ' + id);
    console.log(admissionList);
    this.admissionService.updateAdmissionApi(id, admissionList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Updated!',
          duration: 4000,
        });
        document.getElementById('modal-close').click();
        this.admissionList$ = this.admissionService.getAdmissionApi();
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
  getPatientSchdule() {
    this.patientService.getPatientScheduleApi().subscribe((res) => {
      this.patientSchedule$ = res.filter(
        (patientSchedulesList: { is_Payed: boolean }) =>
          patientSchedulesList.is_Payed == true
      );
    });
  }
  getEmployee() {
    const selectedPatientId = +this.patientId;
    this.patientService.getPatientScheduleApi().subscribe((res) => {
      this.employeeId$ = res.filter(
        (employee: { patientId: number }) =>
          employee.patientId == selectedPatientId
      );
      this.admissionTypeId$ = res.filter(
        (admissionType: { patientId: number }) =>
          admissionType.patientId == selectedPatientId
      );
      this.roomId$ = res.filter(
        (room: { patientId: number }) =>
          room.patientId == selectedPatientId
      );
    });
  }
}
