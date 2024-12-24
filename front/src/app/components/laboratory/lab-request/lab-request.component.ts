import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-lab-request',
  templateUrl: './lab-request.component.html',
  styleUrls: ['./lab-request.component.css'],
})
export class LabRequestComponent implements OnInit {
  labRequestList$: any;
  employeeId$: any;
  labTestCategoryId$: any;
  AdmissionId: number;
  PatientId: number;

  //Map to display data associate with foreign keys
  employeeMap: Map<number, string> = new Map();
  // admissionMap: Map<number, string> = new Map();
  labTestCategoryMap: Map<number, string> = new Map();

  // Variables (properties)
  id: number;
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  modalTitle: string = '';
  activateLabRequestComponent: boolean = false;
  labRequestList: any;

  // Variables (properties)
  modalBillLabTitle: string = '';
  activateBillLabComponent: boolean = false;
  billLabList: any;
  // Variables (properties)
  modalLabTestResultTitle: string = '';
  activateLabTestResultComponent: boolean = false;
  labTestResultList: any;
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
  userRole: string;

  // Map to display data associate with foreign keys
  constructor(
    private labRequestService: LaboratoryService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('Role');

    if (storedData) {
      
      this.userRole = storedData;
      
      console.log(this.userRole) // Assuming 'role' is stored in the patientData object
    }
    this.AdmissionId = this.route.snapshot.params['admissionId'];
    this.PatientId = this.route.snapshot.params['PatientId'];
    this.getLabRequestList();
    this.getEmployeeMap();
    this.getLabTestCategoryMap();

    this.email = this.authService.getEmailFromToken();
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
      this.getEmployeeRole(this.employee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.employeeService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.employeeRole = data;
    });
  }

  getLabRequestList() {
    this.labRequestService.getLabRequestApi().subscribe((response) => {
      this.labRequestList$ = response.filter(
        (labRequest: { admissionId: number }) =>
          labRequest.admissionId == this.AdmissionId
      );
    });
  }

  getEmployeeMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeId$[i].id,
          this.employeeId$[i].firstName + ' ' + this.employeeId$[i].lastName
        );
      }
    });
  }

  getLabTestCategoryMap() {
    this.labRequestService.getLabTestCategoryApi().subscribe((data) => {
      this.labTestCategoryId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.labTestCategoryMap.set(
          this.labTestCategoryId$[i].id,
          this.labTestCategoryId$[i].name
        );
      }
    });
  }

  modalAdd() {
    this.labRequestList = {
      id: 0,
      admissionId: null,
      orderedDate: null,
      laboratoryTestCategoryId: null,
      employeeId: null,
      remark: null,
      priority: null,
      isCancelled: null,
      isPaid: null,

      name: null,
      result: null,
      laboratoryTestTypeId: null,
      description: null,
    };
    this.modalTitle = 'Add Lab Request';
    this.activateLabRequestComponent = true;
  }
  modalEdit(item: any) {
    this.labRequestList = item;
    this.modalTitle = 'Edit Lab Request';
    this.activateLabRequestComponent = true;
  }
  modalBillLabAdd(id: number) {
    this.billLabList = {
      id: 0,
      labRequestId: id,
      employeeId: null,
      serviceChargeId: null,
      date: null,
      description: null,
    };
    this.modalTitle = 'Add Bill Laboratory';
    this.activateBillLabComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete lab request ${item.id}`)) {
      this.labRequestService.deleteLabRequestApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: item.result + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
      this.getLabRequestList();
    }
  }
  
  modalClose() {
    this.activateLabRequestComponent = false;
    this.getLabRequestList();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getLabRequestList();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getLabRequestList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.labRequestList$.filter((res: any) => {
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
}
