import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { PatientService } from 'src/app/services/patient.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.css'],
})
export class OperationFormComponent implements OnInit {
  admissionList: any = [];
  admissionId: number = 0;
  isSaving: boolean = false;
  saveBut: string = 'Save';
  isUpdating: boolean = false;
  butUpdate: string = 'Update';

  constructor(
    private operationService: PatientService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private toast: NgToastService,
    private toastr: ToastrService
  ) {}

  @Input() operationList: any;
  id: number = 0;
  date: string = '';
  description: string = '';
  status: string= '';

  ngOnInit(): void {
    this.id = this.operationList.id;
    this.description = this.operationList.description;
    this.date = this.operationList.date;
    this.status = this.operationList.status;


    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
  }
  addOperation() {
    this.isSaving = true;
    this.saveBut  = 'Saving';
    var operationList = {
      date: this.date,
      employeeId: +this.admissionList.employeeId,
      patientId: +this.admissionList.patientId,
      description: this.description,
      status: this.status
    };

    this.operationService.addOperationApi(operationList).subscribe(
      (res) => {
        this.toastr.success('Sucessfully Added!'
          );
        
        this.isSaving = false;
        var closeModalBtn = document.getElementById('operation-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toastr.error( 'Something went wrong!');
        this.isSaving = false;
      }
    );
  }
  updateOperation() {
    this.isUpdating = true
    this.butUpdate = 'Updating'
    var operationList = {
      id: this.id,
      employeeId: +this.admissionList.employeeId,
      patientId: +this.admissionList.patientId,
      date: this.date,
      description: this.description,
      status: this.status
    };
    var id: number = this.id;
    console.log(operationList);

    this.operationService.updateOperationApi(id, operationList).subscribe(
      (res) => {
        this.toastr.success('Sucessfully Updated!');
        var closeModalBtn = document.getElementById('operation-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.isUpdating = false
      },
      (err) => {
        this.toastr.error('Something went wrong!');
        this.isUpdating = false
      }
    );
  }
}
