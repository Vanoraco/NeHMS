import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-labtest-result-form',
  templateUrl: './labtest-result-form.component.html',
  styleUrls: ['./labtest-result-form.component.css'],
})
export class LabtestResultFormComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private labTestReService: LaboratoryService,
    private alert: NgToastService,
    private activeroute: ActivatedRoute
  ) {}
  labTestResultList$: any = [];
  labTesTypeList$!: Observable<any[]>;
  labRequestList$: any = [];

  @Input() labTestResultList: any;
  id: number = 0;
  name: string = '';
  result: string = '';
  labRequestId: number = 0;
  laboratoryTestTypeId: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.id = this.labTestResultList.id;
    this.name = this.labTestResultList.name;
    this.result = this.labTestResultList.result;
    this.laboratoryTestTypeId = this.labTestResultList.laboratoryTestTypeId;
    this.description = this.labTestResultList.description;

    this.getLabTestResult();
    this.labTesTypeList$ = this.labTestReService.getLabTestTypeApi();
    this.labRequestList$ = this.labTestReService.getLabRequestApi();
  }

  getLabTestResult() {
    this.labTestReService.getLabTestResultApi().subscribe((res) => {
      this.labTestResultList$ = res.filter(
        (labRequest: { labRequestId: number }) =>
          labRequest.labRequestId == this.labRequestId
      );
    });
  }

  addLabTestResult() {
    var labRequestList = {
      labRequestId: +this.labRequestId,
      lablaboratoryTestTypeId: +this.laboratoryTestTypeId,
      result: this.result,
      name: this.name,
      description: this.description,
    };
    console.log(labRequestList);
    this.labTestReService.addLabTestResultApi(labRequestList).subscribe(
      (res) => {
        this.alert.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
        this.getLabTestResult();
      },
      (err) => {
        this.alert.error({
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  modalClose() {
    document.getElementById('labtest-modal-close').click();
    this.getLabTestResult();
  }
  updateItem(item: any) {
    this.labTestResultList = item;
  }
  submitLabTestResult() {
    throw new Error('Method not implemented.');
  }

  delete(item: any) {
    this.labTestReService.deleteLabTestResultApi(item.id).subscribe((res) => {
      this.getLabTestResult();
    });
  }
}
