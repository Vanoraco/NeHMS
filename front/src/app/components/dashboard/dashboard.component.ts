import { Component, OnInit, ElementRef } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
// import { NgxSpinnerService } from 'ngx-spinner';


import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { BedService } from 'src/app/services/bed.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import { PatientService } from 'src/app/services/patient.service';
import { RevenueService } from 'src/app/services/revenue.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  patientData$: any = [];
  employeeData$: any = [];
  expenseData$: any = [];
  revenueData$: any = [];
  doctorData$: any = [];
  accountantData$: any = [];
  receptionistData$: any = [];
  laboratoristData$: any = [];
  piadLabRequests$: any = [];
  pharmacistData$: any = [];
  nurseData$: any = [];
  availableBedData$: any = [];
  activePatientData: any = [];
  inActivePatientData: any = [];
  recentPatient$: any = [];

  id: number;
  loggedInEmpId: number;
  employeeList: any;
  employeeRole: any = [];
  employee: any = [];
  email: any;
  eachPermission: string;
  recentAdmittedPatient$: any = [];
  roomListMap: any;
  patientListMap: any;
  testCategoryListMap: any;

  isLoading: boolean = false;
  roomMap: Map<number, string> = new Map();
  patientMap: Map<number, string> = new Map();
  testCategoryMap: Map<number, string> = new Map();
  noticeList: any;
  piadLabRequests: any;
  revenueAmount: any;
  expenseAmount: any;
  date: any;
  expenseDate: any;

  constructor(
    private elementRef: ElementRef,
    private patientService: PatientService,
    private admissionService: AdmissionService,
    private authService: AuthService,
    private bedService: BedService,
    // private spinnerService: NgxSpinnerService,
    private revenueService: RevenueService,
    private expenseService: ExpenseService,
    private empService: EmployeeService,
    private noticeService: UtilityService,
    private labRequestService: LaboratoryService
  ) {}

  ngOnInit(): void {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);

    this.getTotalEmployee();
    this.getTotalPatient();
    this.calculateTotalExpense();
    this.calculateTotalRevenue();
    this.getTotalDoctors();
    this.getTotalAccountants();
    this.getTotalPharmacists();
    this.getTotalReceptionists();
    this.getTotalLaboratorists();
    this.getTotalNurses();
    this.getAvailableBeds();
    this.getActivePatient();
    this.getInActivePatient();
    this.getRecentPatients();
    this.getRecentAdmittedPatients();
    this.getPatientMap();
    this.getRoomMap();
    this.getNotices();
    this.getPaidLabRequests();
    this.getTestCategoryMap();

    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
          this.loggedInEmpId = this.employeeList[index].id;
        }
      }
    });
  }
  getPaidLabRequests() {
    this.labRequestService.getLabRequestApi().subscribe((res) => {
      this.piadLabRequests$ = res.filter(
        (labRequestPaidStatus: { isPaid: boolean }) =>
          labRequestPaidStatus.isPaid == true
      );
      this.piadLabRequests = this.piadLabRequests$
        .reverse()
        .slice()
        .splice(0, 5);
    });
  }
  getNotices() {
    this.noticeService.getNoticeApi().subscribe((res) => {
      this.noticeList = res.reverse().slice().splice(0, 5);
    });
  }
  getTotalLaboratorists() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.laboratoristData$ = res.filter(
        (empRole: { employeeRoleId: number }) => empRole.employeeRoleId == 6
      );
    });
  }
  getTotalReceptionists() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.receptionistData$ = res.filter(
        (empRole: { employeeRoleId: number }) => empRole.employeeRoleId == 2
      );
    });
  }
  getTotalPharmacists() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.pharmacistData$ = res.filter(
        (empRole: { employeeRoleId: number }) => empRole.employeeRoleId == 4
      );
    });
  }
  getAvailableBeds() {
    this.bedService.getBedApi().subscribe((res) => {
      this.availableBedData$ = res.filter(
        (status: { availableId: number }) => status.availableId == 1
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
    });
  }
  getTotalEmployee() {
    // this.spinnerService.show();
    this.empService.getEmployeeApi().subscribe((res) => {
      this.employeeData$ = res;
      // this.spinnerService.hide();
    });
  }
  getTotalAccountants() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.accountantData$ = res.filter(
        (empRole: { employeeRoleId: number }) => empRole.employeeRoleId == 7
      );
    });
  }
  getTotalDoctors() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.doctorData$ = res.filter(
        (empRole: { employeeRoleId: number }) => empRole.employeeRoleId == 3
      );
    });
  }
  getTotalNurses() {
    this.empService.getEmployeeApi().subscribe((res) => {
      this.nurseData$ = res.filter(
        (empRole: { employeeRoleId: number }) => empRole.employeeRoleId == 5
      );
    });
  }
  getTotalPatient() {
    this.patientService.getPatientApi().subscribe((res) => {
      this.patientData$ = res;
    });
  }
  getActivePatient() {
    this.patientService.getPatientScheduleApi().subscribe((res) => {
      this.activePatientData = res.filter(
        (patientSchedule: { statues: string }) =>
          patientSchedule.statues == 'Active'
      );
    });
  }
  getInActivePatient() {
    this.patientService.getPatientScheduleApi().subscribe((res) => {
      this.inActivePatientData = res.filter(
        (patientSchedule: { statues: string }) =>
          patientSchedule.statues == 'In-Active'
      );
    });
  }
  getRecentPatients() {
    this.patientService.getPatientApi().subscribe((res) => {
      this.recentPatient$ = res.reverse().slice().splice(0, 5);
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
  getRoomMap() {
    this.bedService.getRoomApi().subscribe((data) => {
      this.roomListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.roomMap.set(this.roomListMap[i].id, this.roomListMap[i].name);
      }
    });
  }
  getTestCategoryMap() {
    this.labRequestService.getLabTestCategoryApi().subscribe((data) => {
      this.testCategoryListMap = data;
      for (let i = 0; i < data.length; i++) {
        this.testCategoryMap.set(
          this.testCategoryListMap[i].id,
          this.testCategoryListMap[i].name
        );
      }
    });
  }
  getRecentAdmittedPatients() {
    this.admissionService.getAdmissionApi().subscribe((res) => {
      this.recentAdmittedPatient$ = res.reverse().slice().splice(0, 5);
    });
  }
  totalExpenseAmount: number = 0;
  calculateTotalExpense() {
    this.expenseService.getExpenseApi().subscribe((res) => {
      this.expenseData$ = res;
      this.expenseData$.forEach(
        (totalExpense: { amount: number }) =>
          (this.totalExpenseAmount += totalExpense.amount)
      );
    });
  }
  totalRevenueAmount: number = 0;
  calculateTotalRevenue() {
    this.revenueService.getRevenueApi().subscribe((res) => {
      this.revenueData$ = res;
      this.calculateTotalExpense();
      this.buildLineChart(this.revenueData$, this.expenseData$);
      this.revenueData$.forEach(
        (totalRevenue: { amount: number }) =>
          (this.totalRevenueAmount += totalRevenue.amount)
      );
    });
  }
  buildLineChart(revenue: any, expense: any) {
    this.revenueAmount = revenue.map(
      (revenueAmount: any) => revenueAmount.amount
    );
    this.expenseAmount = expense.map(
      (expenseAmount: any) => expenseAmount.amount
    );
    this.date = revenue.map((dateOfFinancing: any) => dateOfFinancing.date);
    this.lineChartData = {
      labels: this.date,
      datasets: [
        {
          data: this.expenseAmount,
          label: 'Expenses',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          tension: 0.5,
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
        {
          data: this.revenueAmount,
          label: "Revenues",
          backgroundColor: 'rgba(77,83,96,0.2)',
          borderColor: 'rgba(77,83,96,1)',
          pointBackgroundColor: 'rgba(77,83,96,1)',
          pointBorderColor: '#fff',
          tension: 0.5,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(77,83,96,1)',
          fill: 'origin',
        },
      ],
    };
  }

  public lineChartData: ChartConfiguration<'line'>['data'];

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
}
