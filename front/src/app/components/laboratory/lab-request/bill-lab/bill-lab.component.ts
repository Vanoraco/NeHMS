import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-bill-lab',
  templateUrl: './bill-lab.component.html',
  styleUrls: ['./bill-lab.component.css'],
})
export class BillLabComponent implements OnInit {
  employeeList$: any = [];
  billLab$: any = [];
  labRequestListOne$: any;
  labRequestList$: any;
  serviceChargeList$: any;

  constructor(
    private billLabService: BillingService,
    private labRequestService: LaboratoryService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() billLabList: any;
  id: number = 0;
  labRequestId: number = 0;
  employeeId: number = 0;
  serviceChargeId: number = 0;
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.billLabList.id;
    this.employeeId = this.billLabList.employeeId;
    this.serviceChargeId = this.billLabList.serviceChargeId;
    this.date = this.billLabList.date;
    this.description = this.billLabList.description;

    this.billLab$ = this.billLabService.getBillLabApi();
    this.labRequestListOne$ = this.labRequestService.getLabRequestApi();
    this.serviceChargeList$ = this.employeeService.getServiceChargeApi();
    this.getEmployee();
    this.getLabRequestById();
  }

  getEmployee() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeList$ = res.filter(
        (employee: { employeeRoleId: number }) => employee.employeeRoleId == 7
      );
    });
  }
  
  addBillLab() {
    var billLabList = {
      labRequestId: this.billLabList.labRequestId,
      employeeId: +this.employeeId,
      serviceChargeId: +this.serviceChargeId,
      date: this.date,
      description: this.description,
    };
    console.log(billLabList);
    this.billLabService.addBillLabApi(billLabList).subscribe(
      (res) => {
        this.updateLabRequest();
        this.getLabRequest();
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
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
  getLabRequest() {
    this.labRequestService.getLabRequestApi().subscribe((res) => {
      this.labRequestList$ = res;
    });
  }
  getLabRequestById() {
    this.labRequestService
      .getLabRequestByIdApi(this.billLabList.labRequestId)
      .subscribe((res) => {
        this.labRequestListOne$ = res;
      });
  }

  updateLabRequest() {
    var labRequestList = {
      id: this.labRequestListOne$.id,
      employeeId: +this.labRequestListOne$.employeeId,
      admissionId: +this.labRequestListOne$.admissionId,
      laboratoryTestCategoryId: +this.labRequestListOne$.laboratoryTestCategoryId,
      remark: this.labRequestListOne$.remark,
      orderedDate: this.labRequestListOne$.orderedDate,
      priority: this.labRequestListOne$.priority,
      isCancelled: this.labRequestListOne$.isCancelled == 'true' ? true : false,
      isPaid: true,
    };
    var id: number = this.labRequestListOne$.id;
    console.log(labRequestList);

    this.labRequestService.updateLabRequestApi(id, labRequestList).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
