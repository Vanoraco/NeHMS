import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-case-form',
  templateUrl: './case-form.component.html',
  styleUrls: ['./case-form.component.css'],
})
export class CaseFormComponent implements OnInit {
  admissionList: any = [];
  admissionId: number = 0;

  constructor(
    private caseService: PatientService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private toast: NgToastService
  ) {}

  @Input() CaseList: any;
  id: number = 0;
  date: string = '';
  patientId: number = 0;
  title: string = '';
  caseDetail: string = '';

  ngOnInit(): void {
    this.id = this.CaseList.id;
    this.date = this.CaseList.date;
    this.title = this.CaseList.title;
    this.caseDetail = this.CaseList.caseDetail;

    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
  }

  addCase() {
    var CaseList = {
      date: this.date,
      patientId: +this.admissionList.patientId,
      title: this.title,
      caseDetail: this.caseDetail,
    };
    console.log(CaseList);
    this.caseService.addCaseApi(CaseList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.title + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('case-modal-close');
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
  updateCase() {
    var CaseList = {
      id: this.id,
      date: this.date,
      patientId: +this.admissionList.patientId,
      title: this.title,
      caseDetail: this.caseDetail,
    };
    var id: number = this.id;
    console.log(CaseList);

    this.caseService.updateCaseApi(id, CaseList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.date + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('case-modal-close');
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
