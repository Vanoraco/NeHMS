import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { BedService } from 'src/app/services/bed.service';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient-schedule-detail',
  templateUrl: './patient-schedule-detail.component.html',
  styleUrls: ['./patient-schedule-detail.component.css'],
})
export class PatientScheduleDetailComponent implements OnInit {
  patientScheduleId: number;
  employeeListMap: Observable<any[]>;
  patientListMap: Observable<any[]>;
  roomListMap: Observable<any[]>;
  appointmentDurationListMap: Observable<any[]>;
  admissionTypeListMap: Observable<any[]>;
  scheduleStatusListMap: Observable<any[]>;

  billSchedulesOnePatient: any = [];
  modalTitle: string = '';
  activateBillSchedulesComponent: boolean = false;
  billSchedulesList: any;
  url = 'https://creavers.com/hms/image/uploads/1111.jpg';

  // Map to display data associate with foreign keys
  patientMap: Map<number, string> = new Map();
  employeeMap: Map<number, string> = new Map();
  admissionTypeMap: Map<number, string> = new Map();
  roomMap: Map<number, string> = new Map();
  appointmentDurationMap: Map<number, string> = new Map();
  scheduleStatusMap: Map<number, string> = new Map();

  id: number;
  employeeList: any = [];
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  patientScheduleList: any = [];
  constructor(
    private empService: EmployeeService,
    private patientService: PatientService,
    private authService: AuthService,
    private scheduleStatusService: LaboratoryService,
    private roomService: BedService,
    private route: ActivatedRoute,
    private billSchedulesService: BillingService,
    private toast: NgToastService,
    private admissionService: AdmissionService
  ) {}

  ngOnInit(): void {
    this.patientScheduleId = this.route.snapshot.params['patientScheduleId'];
    this.patientService
      .getPatientScheduleByIdApi(this.patientScheduleId)
      .subscribe((res) => {
        this.patientScheduleList = res;
      });
    this.getEmployeeMap();
    this.getPatientMap();
    this.getappointmentDurationMap();
    this.getRoomMap();
    this.getAdmissionTypeMap();
    this.getscheduleStatusMap();
    this.getBillSchedule();

    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeListMap = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeListMap[index].emailAddress) {
          this.getEmployeeById(this.employeeListMap[index].id);
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

  getPatientMap() {
    this.patientService.getPatientApi().subscribe((data) => {
      this.patientListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.patientMap.set(
          this.patientListMap[i].id,
          this.patientListMap[i].firstName +
            ' ' +
            this.patientListMap[i].lastName
        );
      }
    });
  }

  getEmployeeMap() {
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeListMap[i].id,
          this.employeeListMap[i].firstName +
            ' ' +
            this.employeeListMap[i].lastName
        );
      }
    });
  }
  getRoomMap() {
    this.roomService.getRoomApi().subscribe((data) => {
      this.roomListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.roomMap.set(this.roomListMap[i].id, this.roomListMap[i].name);
      }
    });
  }
  getappointmentDurationMap() {
    this.empService.getAppointmentDurationApi().subscribe((data) => {
      this.appointmentDurationListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.appointmentDurationMap.set(
          this.appointmentDurationListMap[i].id,
          this.appointmentDurationListMap[i].name
        );
      }
    });
  }
  getscheduleStatusMap() {
    this.scheduleStatusService.getScheduleStatusApi().subscribe((data) => {
      this.scheduleStatusListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.scheduleStatusMap.set(
          this.scheduleStatusListMap[i].id,
          this.scheduleStatusListMap[i].name
        );
      }
    });
  }
  getAdmissionTypeMap() {
    this.admissionService.getAdmissionTypeApi().subscribe((data) => {
      this.admissionTypeListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.admissionTypeMap.set(
          this.admissionTypeListMap[i].id,
          this.admissionTypeListMap[i].name
        );
      }
    });
  }

  getBillSchedule() {
    this.billSchedulesService.getBillScheduleApi().subscribe((response) => {
      this.billSchedulesOnePatient = response.filter(
        (billSchedulesList: { patientScheduleId: number }) =>
          billSchedulesList.patientScheduleId == this.patientScheduleId
      );
    });
  }

  modalAdd() {
    this.billSchedulesList = {
      id: 0,
      serviceChargeId: null,
      patientScheduleId: null,
      employeeId: null,
      date: null,
    };
    this.modalTitle = 'Add Bill Schedules List';
    this.activateBillSchedulesComponent = true;
  }

  modalEdit(item: any) {
    this.billSchedulesList = item;
    this.modalTitle = 'Edit Bill Schedules List';
    this.activateBillSchedulesComponent = true;
  }
  modalClose() {
    this.activateBillSchedulesComponent = false;
    //
    this.getBillSchedule();
  }
  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete Bill Schedules List ${item.id}`)
    ) {
      this.billSchedulesService
        .deleteBillScheduleApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getBillSchedule();
        });
    }
  }
}
