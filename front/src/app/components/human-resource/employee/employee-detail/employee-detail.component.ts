import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: number;
  employeeList: any = [];
  languageListMap: Observable<any[]>;
  specializationListMap: Observable<any[]>;
  designationListMap: Observable<any[]>;
  genderListMap: Observable<any[]>;
  employeeRoleListMap: Observable<any[]>;
  countryListMap: Observable<any[]>;
  admissionTypeListMap: Observable<any[]>;

  // Map to display data associate with foreign keys
  genderMap: Map<number, string> = new Map();
  languageMap: Map<number, string> = new Map();
  specializationMap: Map<number, string> = new Map();
  designationMap: Map<number, string> = new Map();
  employeeRoleMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();
  medicationMap: Map<number, string> = new Map();
  weekDayMap: Map<number, string> = new Map();
  salaryListMap: Map<number, string> = new Map();
  patientListMap: Map<number, string> = new Map();
  employeeListMap: Map<number, string> = new Map();
  medicalDepartmentListMap: Map<number, string> = new Map();

  url = 'assets/img/profile-img.jpg';

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

  loggedInEmployeeid: number;
  loggedInEmployeeList: any;
  loggedInEmployee: any = [];
  loggedInEmployeeRole: any = [];
  loggedInEmployeeEmail: any;

  patientList$: any;
  appointmentList$: any;
  scheduleList$: any;
  payrollList$: any;
  weekDayList: any;
  salaryList$: any;
  admissionList$: any;
  employeeList$: any;
  employeeMdListMap: any;
  employeeRoleList: any;

  constructor(
    private employeeService: EmployeeService,
    private patientService: PatientService,
    private admissionService: AdmissionService,
    private authService: AuthService,
    private payrollService: BillingService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.employeeService
      .getEmployeeByIdApi(this.employeeId)
      .subscribe((res) => {
        this.employeeList = res;
        console.log(this.employeeList);

      });

    this.getLanguageMap();
    this.getGenderMap();
    this.getCountryMap();
    this.getSpecializationMap();
    this.getDesignationMap();
    this.getEmployeeRoleMap();
    this.getScheduleList();
    this.getPayrollList();
    this.getAdmissionList();
    this.getWeekDayMap();
    this.getEmployeeSalaryMap();
    this.getPatientNameMap();
    this.getEmployeeNameMap();
    this.getEmployeeMDMap();

    this.loggedInEmployeeEmail = this.authService.getEmailFromToken();
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.loggedInEmployeeList = data;
      for (let index = 0; index < this.loggedInEmployeeList.length; index++) {
        if (
          this.loggedInEmployeeEmail ==
          this.loggedInEmployeeList[index].emailAddress
        ) {
          this.getEmployeeById(this.loggedInEmployeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.loggedInEmployee = data;
      this.getEmployeeRole(this.loggedInEmployee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.employeeService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.loggedInEmployeeRole = data;
    });
  }

  getGenderMap() {
    this.employeeService.getGenders().subscribe((data) => {
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
    this.employeeService.getLanguages().subscribe((data) => {
      this.languageListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.languageMap.set(
          this.languageListMap[i].id,
          this.languageListMap[i].name
        );
      }
    });
  }
  getSpecializationMap() {
    this.employeeService.getSpecializations().subscribe((data) => {
      this.specializationListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.specializationMap.set(
          this.specializationListMap[i].id,
          this.specializationListMap[i].name
        );
      }
    });
  }
  getDesignationMap() {
    this.employeeService.getDesignations().subscribe((data) => {
      this.designationListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.designationMap.set(
          this.designationListMap[i].id,
          this.designationListMap[i].name
        );
      }
    });
  }
  getCountryMap() {
    this.employeeService.getCountries().subscribe((data) => {
      this.countryListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.countryMap.set(
          this.countryListMap[i].id,
          this.countryListMap[i].name
        );
      }
    });
  }
  getEmployeeRoleMap() {
    this.employeeService.getEmployeeRoleApi().subscribe((data) => {
      this.employeeRoleListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeRoleMap.set(
          this.employeeRoleListMap[i].id,
          this.employeeRoleListMap[i].name
        );
      }
    });
  }
  getEmployeeMDMap() {
    this.employeeService.getMedicalDepartments().subscribe((data) => {
      this.employeeMdListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.medicalDepartmentListMap.set(
          this.employeeMdListMap[i].id,
          this.employeeMdListMap[i].name
        );
      }
    });
  }
  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((data) => {
      this.patientList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.patientListMap.set(
          this.patientList$[i].id,
          this.patientList$[i].firstName + ' ' + this.patientList$[i].lastName
        );
      }
    });
  }
  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeListMap.set(
          this.employeeList$[i].id,
          this.employeeList$[i].firstName + ' ' + this.employeeList$[i].lastName
        );
      }
    });
  }

  getAdmissionList() {
    this.admissionService.getAdmissionApi().subscribe((res) => {
      this.admissionList$ = res.filter(
        (admissionList: { employeeId: number }) =>
          admissionList.employeeId == this.employeeId
      );
    });
  }
  getScheduleList() {
    this.patientService.getScheduleApi().subscribe((res) => {
      this.scheduleList$ = res.filter(
        (scheduleList: { employeeId: number }) =>
          scheduleList.employeeId == this.employeeId
      );
    });
  }
  getPayrollList() {
    this.payrollService.getPayrollReportApi().subscribe((response) => {
      this.payrollList$ = response.filter(
        (payrollList: { employeeId: number }) =>
          payrollList.employeeId == this.employeeId
      );
    });
  }
  getWeekDayMap() {
    this.patientService.getWeekDayApi().subscribe((response) => {
      this.weekDayList = response;
      for (let i = 0; i < response.length; i++) {
        this.weekDayMap.set(this.weekDayList[i].id, this.weekDayList[i].name);
      }
    });
  }

  getEmployeeSalaryMap() {
    this.employeeService.getEmployeeSalaryApi().subscribe((data) => {
      this.salaryList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.salaryListMap.set(
          this.salaryList$[i].id,
          this.salaryList$[i].salary
        );
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.getCaseList();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.getCaseList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      // this.caseList$.filter((res: any) => {
      //   return res.searchName
      //     .toLocaleLowerCase()
      //     .match(res.searchName.toLocaleLowerCase());
      // });
    }
  }
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
}
