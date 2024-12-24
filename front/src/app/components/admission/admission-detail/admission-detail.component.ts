import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { BedService } from 'src/app/services/bed.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admission-detail',
  templateUrl: './admission-detail.component.html',
  styleUrls: ['./admission-detail.component.css'],
})
export class AdmissionDetailComponent implements OnInit {
  admissionId: number;
  employeeListMap: Observable<any[]>;
  patientListMap: Observable<any[]>;
  roomListMap: Observable<any[]>;
  wardListMap: Observable<any[]>;
  admissionTypeListMap: Observable<any[]>;

  imageApiPath = environment.imageUrl;
  url = 'http://localhost:4200/upload/default.png';

  // Map to display data associate with foreign keys
  patientMap: Map<number, string> = new Map();
  employeeMap: Map<number, string> = new Map();
  admissionTypeMap: Map<number, string> = new Map();
  roomMap: Map<number, string> = new Map();
  wardMap: Map<number, string> = new Map();

  id: number;
  employeeList: any = [];
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;
  admissionList: any = [];

  constructor(
    private empService: EmployeeService,
    private patientService: PatientService,
    private authService: AuthService,
    private wardRoomService: BedService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService
  ) {}

  ngOnInit(): void {
   
    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
        this.getPatientImage(this.admissionList.patientId);
      });
    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
    this.getEmployeeMap();
    this.getPatientMap();
    this.getWardMap();
    this.getRoomMap();
    this.getAdmissionTypeMap();
  }

  pateintImageList: any = [];
  getPatientImage(id: any) {
    this.patientService.getPatientByIdApi(id).subscribe((res) => {
      this.pateintImageList = res;
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
      console.log(this.employeeRole.name);
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
    this.wardRoomService.getRoomApi().subscribe((data) => {
      this.roomListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.roomMap.set(this.roomListMap[i].id, this.roomListMap[i].name);
      }
    });
  }
  getWardMap() {
    this.wardRoomService.getWardApi().subscribe((data) => {
      this.wardListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.wardMap.set(this.wardListMap[i].id, this.wardListMap[i].name);
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

  public createImgPath = (serverPath: string) => {
    return this.imageApiPath + serverPath;
  };
}
