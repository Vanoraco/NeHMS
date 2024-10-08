import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-laboratory-test-type-form',
  templateUrl: './laboratory-test-type-form.component.html',
  styleUrls: ['./laboratory-test-type-form.component.css'],
})
export class LaboratoryTestTypeFormComponent implements OnInit {
  labTestTypeList$: any;
  labTestCategoryId$: any;

  constructor(
    private labTestTypeService: LaboratoryService,
    private toast: NgToastService
  ) {}

  @Input() labTestTypeList: any;
  id: number = 0;
  name: string = '';
  laboratoryTestCategoryId: number = 0;
  price: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.id = this.labTestTypeList.id;
    this.name = this.labTestTypeList.name;
    this.laboratoryTestCategoryId =
      this.labTestTypeList.laboratoryTestCategoryId;
    this.price = this.labTestTypeList.price;
    this.description = this.labTestTypeList.description;

    this.labTestTypeList$ = this.labTestTypeService.getLabTestTypeApi();
    this.labTestCategoryId$ = this.labTestTypeService.getLabTestCategoryApi();
  }

  addLaboratoryTestType() {
    var labTestTypeList = {
      name: this.name,
      laboratoryTestCategoryId: +this.laboratoryTestCategoryId,
      price: +this.price,
      description: this.description,
    };
    console.log(labTestTypeList);
    this.labTestTypeService.addLabTestTypeApi(labTestTypeList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showAddSuccess = document.getElementById('add-success-alert');
        if (showAddSuccess) {
          showAddSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showAddSuccess) {
            showAddSuccess.style.display = 'none';
          }
        }, 4000);
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
  updateLaboratoryTestType() {
    var labTestTypeList = {
      id: this.id,
      name: this.name,
      laboratoryTestCategoryId: +this.laboratoryTestCategoryId,
      price: +this.price,
      description: this.description,
    };
    var id: number = this.id;
    console.log(labTestTypeList);

    this.labTestTypeService.updateLabTestTypeApi(id, labTestTypeList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showUpdateSuccess = document.getElementById('update-success-alert');
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showUpdateSuccess) {
            showUpdateSuccess.style.display = 'none';
          }
        }, 4000);
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
