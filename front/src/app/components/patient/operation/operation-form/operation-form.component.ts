import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css'],
})
export class OperationFormComponent implements OnInit {
  admissionList: any = [];
  admissionId: number = 0;

  constructor(
    private operationService: PatientService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private toast: NgToastService
  ) {}

  @Input() operationList: any;
  id: number = 0;
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.operationList.id;
    this.description = this.operationList.description;
    this.date = this.operationList.date;

    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
  }
  addOperation() {
    var operationList = {
      date: this.date,
      employeeId: +this.admissionList.employeeId,
      patientId: +this.admissionList.patientId,
      description: this.description,
    };
    this.operationService.addOperationApi(operationList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('operation-modal-close');
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
  updateOperation() {
    var operationList = {
      id: this.id,
      employeeId: +this.admissionList.employeeId,
      patientId: +this.admissionList.patientId,
      date: this.date,
      description: this.description,
    };
    var id: number = this.id;
    console.log(operationList);

    this.operationService.updateOperationApi(id, operationList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('operation-modal-close');
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
}
