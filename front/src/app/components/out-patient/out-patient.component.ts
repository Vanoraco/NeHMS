import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-out-patient',
  templateUrl: './out-patient.component.html',
  styleUrls: ['./out-patient.component.css'],
})
export class OutPatientComponent implements OnInit {
  employeeId!: Observable<any[]>;
  patientId: Observable<any[]>;
  admissionTypeId: Observable<any[]>;
  roomId!: Observable<any[]>;
  wardId!: Observable<any[]>;
  admissionList$: any = [];
  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();
  employeeMap: Map<number, string> = new Map();
  admissionTypeMap: Map<number, string> = new Map();

  // Variables (properties)
  id: number;
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  modalTitle: string = '';
  activateAdmissionComponent: boolean = false;
  admissionList: any;

  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  fileName = 'out-patient-report.xlsx';
  tableSizes: any = [5, 10, 15, 20];
  constructor(
    private empService: EmployeeService,
    private patientService: PatientService,
    private admissionService: AdmissionService,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPatientNameMap();
    this.getEmployeeMap();
    this.getAdmissionTypeMap();

    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
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
      this.getAdmission(this.employeeRole.id);
    });
  }

  getAdmission(roleId: number = this.employeeRole.id) {
    console.log(roleId);
    if (roleId == 3) {
      console.log('Role : ' + roleId);
      this.getAdmissionEachDoctor();
    } else {
      this.getAllAdmission();
    }
  }

  getAllAdmission() {
    this.admissionService.getAdmissionApi().subscribe((res) => {
      this.admissionList$ = res.filter(
        (opdOnly: { admissionTypeId: number }) => opdOnly.admissionTypeId == 4
      );
      this.getNewDataFrst('id');
    });
  }

  getAdmissionEachDoctor() {
    this.admissionService.getAdmissionApi().subscribe((res) => {
      this.admissionList$ = res.filter(
        (admissionDataDoctor: { employeeId: number }) =>
          admissionDataDoctor.employeeId == this.employee.id
      );
      this.getNewDataFrst('id');
    });
  }

  getNewDataFrst(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }

  getAdmissionTypeMap() {
    this.admissionService.getAdmissionTypeApi().subscribe((data) => {
      this.admissionTypeId = data;
      for (let i = 0; i < data.length; i++) {
        this.admissionTypeMap.set(
          this.admissionTypeId[i].id,
          this.admissionTypeId[i].name
        );
      }
    });
  }

  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((data) => {
      this.patientId = data;
      for (let i = 0; i < data.length; i++) {
        this.patientListMap.set(
          this.patientId[i].id,
          this.patientId[i].firstName + ' ' + this.patientId[i].lastName
        );
      }
    });
  }

  getEmployeeMap() {
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeId = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeId[i].id,
          this.employeeId[i].firstName + ' ' + this.employeeId[i].lastName
        );
      }
    });
  }

  modalAdd() {
    this.admissionList = {
      id: 0,
      admissionTypeId: null,
      patientId: null,
      employeeId: null,
      roomId: null,
      wardId: null,
      admissionTime: null,
      admissionDate: null,
      dischargeDate: null,
      isDischarge: null,
    };
    this.modalTitle = 'New OPD Patient';
    this.activateAdmissionComponent = true;
  }

  modalEdit(item: any) {
    this.admissionList = item;
    this.modalTitle = 'Edit OPD Patient';
    this.activateAdmissionComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete opd ${item.id}`)) {
      this.admissionService.deleteAdmissionApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAllAdmission();
      });
    }
  }

  modalClose() {
    this.activateAdmissionComponent = false;
    this.getAllAdmission();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAllAdmission();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllAdmission();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.admissionList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.admissionList.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[key] < b[key]) {
          return -1 * direction;
        } else if (a[key] < b[key]) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    );
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('out-patient-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
