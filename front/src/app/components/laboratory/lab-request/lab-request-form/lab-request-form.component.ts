import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-lab-request-form',
  templateUrl: './lab-request-form.component.html',
  styleUrls: ['./lab-request-form.component.css'],
})
export class LabRequestFormComponent implements OnInit {
  labRequestList$!: Observable<any[]>;
  employeeId$: any = [];
  admissionList$!: any;
  labTestTypeId$!: any;
  labTestCategoryId$!: Observable<any[]>;

  // Variables (properties)
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;

  AdmissionId: number = 0;
  labTesTypeList$: Observable<any>;
  labTestResultList$: any;

  //Map to display data associate with foreign keys
  labTestTypeMap: Map<number, string> = new Map();

  constructor(
    private labRequestService: LaboratoryService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  @Input() labRequestList: any;

  id: number = 0;
  employeeId: number = 0;
  admissionId: number = 0;
  laboratoryTestCategoryId: number = 0;
  remark: string = '';
  orderedDate: string = '';
  priority: string = '';
  isCancelled: string = '';
  isPaid: string = '';

  // Lab Test Result Variables
  labTestResultId: number = 0;
  name: string = '';
  result: string = '';
  laboratoryTestTypeId: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.AdmissionId = this.route.snapshot.params['admissionId'];
    this.id = this.labRequestList.id;
    this.admissionId = this.labRequestList.admissionId;
    this.laboratoryTestCategoryId =
      this.labRequestList.laboratoryTestCategoryId;
    this.orderedDate = this.labRequestList.orderedDate;
    this.remark = this.labRequestList.remark;
    this.priority = this.labRequestList.priority;
    this.isCancelled = this.labRequestList.isCancelled;
    this.isPaid = this.labRequestList.isPaid;

    this.labTestResultId = this.labRequestList.labTestResultId;
    this.name = this.labRequestList.name;
    this.result = this.labRequestList.result;
    this.laboratoryTestTypeId = this.labRequestList.labTestTypeId;
    this.description = this.labRequestList.description;

    this.getLabTestResult();
    this.getLabTestTypeMap();
    this.labTesTypeList$ = this.labRequestService.getLabTestTypeApi();
    this.labRequestList$ = this.labRequestService.getLabRequestApi();
    this.labTestCategoryId$ = this.labRequestService.getLabTestCategoryApi();

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

  getLabTestResult() {
    this.labRequestService.getLabTestResultApi().subscribe((res) => {
      this.labTestResultList$ = res.filter(
        (labRequest: { labRequestId: number }) =>
          labRequest.labRequestId == this.id
      );
    });
  }

  addLabTestResult() {
    var labRequestList = {
      labRequestId: +this.id, //id from labrequest table
      laboratoryTestTypeId: +this.laboratoryTestTypeId,
      result: this.result,
      name: this.name,
      description: this.description,
    };
    console.log(labRequestList);
    this.labRequestService.addLabTestResultApi(labRequestList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
        this.getLabTestResult();
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

  getLabTestTypeMap() {
    this.labRequestService.getLabTestTypeApi().subscribe((data) => {
      this.labTestTypeId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.labTestTypeMap.set(
          this.labTestTypeId$[i].id,
          this.labTestTypeId$[i].name
        );
      }
    });
  }

  delete(item: any) {
    this.labRequestService.deleteLabTestResultApi(item.id).subscribe((res) => {
      this.getLabTestResult();
    });
  }

  addLabRequest() {
    var labRequestList = {
      employeeId: +this.employee.id,
      admissionId: +this.AdmissionId,
      laboratoryTestCategoryId: +this.laboratoryTestCategoryId,
      remark: this.remark,
      orderedDate: this.orderedDate,
      priority: this.priority,
      isCancelled: this.isCancelled == 'true' ? true : false,
      isPaid: false,
    };
    console.log(labRequestList);
    this.labRequestService.addLabRequestApi(labRequestList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
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

  updateLabRequest() {
    var labRequestList = {
      id: this.id,
      employeeId: +this.employee.id,
      admissionId: +this.AdmissionId,
      laboratoryTestCategoryId: +this.laboratoryTestCategoryId,
      remark: this.remark,
      orderedDate: this.orderedDate,
      priority: this.priority,
      isCancelled: this.isCancelled == 'true' ? true : false,
      isPaid: this.employeeRole.name == 'Laboratorist' ? true : false,
    };
    var id: number = this.id;
    console.log(labRequestList);

    this.labRequestService.updateLabRequestApi(id, labRequestList).subscribe(
      (res) => {
        this.addNotification();
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

  date = new Date().toString();
  addNotification() {
    var notificationList = {
      employeeId: this.employee.id,
      date: this.date,
      status: false,
      title: 'Lab Request Updated',
      description: 'Lab request updated description!!',
    };
    console.log(notificationList);
    this.employeeService.addNotificationMessageApi(notificationList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Notification Message Sucessfully Added!',
          duration: 4000,
        });
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
}
