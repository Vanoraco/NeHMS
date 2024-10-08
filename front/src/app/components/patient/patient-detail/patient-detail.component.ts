import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { BedService } from 'src/app/services/bed.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { PatientService } from 'src/app/services/patient.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css'],
})
export class PatientDetailComponent implements OnInit {
  patientId: number;
  patientList: any = [];
  languageListMap: Observable<any[]>;
  genderListMap: Observable<any[]>;
  bloodGroupListMap: any;
  wardListMap: Observable<any[]>;
  admissionTypeListMap: Observable<any[]>;
  deathList: any = [];
  birthList: any = [];
  employeeId$: any;
  prescriptionList$: any;
  medicatioList$: any;
  medicalHistoryList$: any;
  admissionList$: any;
  caseList$: any;
  responsiblePersonList$: any = [];
  countryList$: any;
  cityList$: any;
  relationshipList$: any;

  // Map to display data associate with foreign keys
  genderMap: Map<number, string> = new Map();
  languageMap: Map<number, string> = new Map();
  admissionTypeMap: Map<number, string> = new Map();
  bloodGroupMap: Map<number, string> = new Map();
  wardMap: Map<number, string> = new Map();
  employeeMap: Map<number, string> = new Map();
  medicationMap: Map<number, string> = new Map();
  cityMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();
  relationshipMap: Map<number, string> = new Map();

  id: number;
  employeeList: any = [];
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  imageApiPath = environment.imageUrl;
  url = 'http://localhost:4200/upload/default.png';

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

  constructor(
    private empService: EmployeeService,
    private patientService: PatientService,
    private authService: AuthService,
    private wardbloodGroupService: BedService,
    private labService: LaboratoryService,
    private prescriptionService: PharmacyService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['patientId'];
    this.patientService.getPatientByIdApi(this.patientId).subscribe((res) => {
      this.patientList = res;
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
    this.getLanguageMap();
    this.getGenderMap();
    this.getWardMap();
    this.getbloodGroupMap();
    this.getAdmissionTypeMap();
    this.getCaseList();
    this.getEmployeeMap();
    this.getPrescription();
    this.getMedicationMap();
    this.getMedicalHistoryList();
    this.getAdmission();
    this.getResponsiblePersonList();
    this.getCountryMap();
    this.getCityMap();
    this.getRelationshipMap();
    this.getBirth();
    this.getDeath();
  }
  getBirth() {
    this.patientService.getBirthApi().subscribe((res) => {
      this.birthList = res.filter(
        (bitrhData: { patientId: number }) =>
          bitrhData.patientId == this.patientId
      );
    });
  }
  getDeath() {
    this.patientService.getDeathApi().subscribe((res) => {
      this.deathList = res.filter(
        (deathData: { patientId: number }) =>
          deathData.patientId == this.patientId
      );
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
  getGenderMap() {
    this.empService.getGenders().subscribe((data) => {
      this.genderListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.genderMap.set(
          this.genderListMap[i].id,
          this.genderListMap[i].name
        );
      }
    });
  }
  getLanguageMap() {
    this.empService.getLanguages().subscribe((data) => {
      this.languageListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.languageMap.set(
          this.languageListMap[i].id,
          this.languageListMap[i].name
        );
      }
    });
  }
  getbloodGroupMap() {
    this.empService.getBloodGroupApi().subscribe((data) => {
      this.bloodGroupListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.bloodGroupMap.set(
          this.bloodGroupListMap[i].id,
          this.bloodGroupListMap[i].name
        );
      }
    });
  }
  getWardMap() {
    this.wardbloodGroupService.getWardApi().subscribe((data) => {
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
  getEmployeeMap() {
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeId$[i].id,
          this.employeeId$[i].firstName + ' ' + this.employeeId$[i].lastName
        );
      }
    });
  }
  getPrescription() {
    this.prescriptionService.getPrescriptionApi().subscribe((res) => {
      this.prescriptionList$ = res.filter(
        (prescription: { patientId: number }) =>
          prescription.patientId == this.patientId
      );
    });
  }
  getCaseList() {
    this.patientService.getCaseApi().subscribe((response) => {
      this.caseList$ = response.filter(
        (patientCase: { patientId: number }) =>
          patientCase.patientId == this.patientId
      );
      console.log(this.caseList$);
    });
  }
  getMedicationMap() {
    this.prescriptionService.getMedicationApi().subscribe((data) => {
      this.medicatioList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.medicationMap.set(
          this.medicatioList$[i].id,
          this.medicatioList$[i].name
        );
      }
    });
  }
  getMedicalHistoryList() {
    this.labService.getMedicalHistoryApi().subscribe((response) => {
      this.medicalHistoryList$ = response.filter(
        (medicalHistory: { patientId: number }) =>
          medicalHistory.patientId == this.patientId
      );
    });
  }
  getAdmission() {
    this.admissionService.getAdmissionApi().subscribe((response) => {
      this.admissionList$ = response.filter(
        (admission: { patientId: number }) =>
          admission.patientId == this.patientId
      );
    });
  }
  getCountryMap() {
    this.empService.getCountries().subscribe((data) => {
      this.countryList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.countryMap.set(this.countryList$[i].id, this.countryList$[i].name);
      }
    });
  }
  getCityMap() {
    this.empService.getCountries().subscribe((data) => {
      this.cityList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.cityMap.set(this.cityList$[i].id, this.cityList$[i].name);
      }
    });
  }
  getRelationshipMap() {
    this.patientService.getRelationshipApi().subscribe((data) => {
      this.relationshipList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.relationshipMap.set(this.relationshipList$[i].id, this.relationshipList$[i].name);
      }
    });
  }
  getResponsiblePersonList() {
    this.patientService.getResponsiblePersonApi().subscribe((response) => {
      this.responsiblePersonList$ = response.filter(
        (responsiblePerson: { patientId: number }) =>
          responsiblePerson.patientId == this.patientId
      );
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getCaseList();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCaseList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.caseList$.filter((res: any) => {
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
  public createImgPath = (serverPath: string) => {
    return this.imageApiPath + serverPath;
  };
}
