import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-bill-laboratory-form',
  templateUrl: './bill-laboratory-form.component.html',
  styleUrls: ['./bill-laboratory-form.component.css'],
})
export class BillLaboratoryFormComponent implements OnInit {
  employeeList$: any;
  billLab$: any = [];
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
    this.labRequestId = this.billLabList.labRequestId;
    this.employeeId = this.billLabList.employeeId;
    this.serviceChargeId = this.billLabList.serviceChargeId;
    this.date = this.billLabList.date;
    this.description = this.billLabList.description;

    this.billLab$ = this.billLabService.getBillLabApi();
    this.employeeList$ = this.employeeService.getEmployeeApi();
    this.labRequestList$ = this.labRequestService.getLabRequestApi();
    this.serviceChargeList$ = this.employeeService.getServiceChargeApi();
  }

  addBillLab() {
    var billLabList = {
      labRequestId: +this.labRequestId,
      employeeId: +this.employeeId,
      serviceChargeId: +this.serviceChargeId,
      date: this.date,
      description: this.description,
    };
    console.log(billLabList);
    this.billLabService.addBillLabApi(billLabList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.labRequestId + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.billLab$ = this.billLabService.getBillLabApi();
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

  updateBillLab() {
    var billLabList = {
      id: this.id,
      labRequestId: +this.labRequestId,
      employeeId: +this.employeeId,
      serviceChargeId: +this.serviceChargeId,
      date: this.date,
      description: this.description,
    };
    var id: number = this.id;
    console.log(billLabList);

    this.billLabService.updateBillLabApi(id, billLabList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.labRequestId + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.billLab$ = this.billLabService.getBillLabApi();
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
}
