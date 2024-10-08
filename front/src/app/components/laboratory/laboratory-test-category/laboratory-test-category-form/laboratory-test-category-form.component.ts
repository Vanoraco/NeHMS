import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LaboratoryService } from 'src/app/services/laboratory.service';

@Component({
  selector: 'app-laboratory-test-category-form',
  templateUrl: './laboratory-test-category-form.component.html',
  styleUrls: ['./laboratory-test-category-form.component.css'],
})
export class LaboratoryTestCategoryFormComponent implements OnInit {
  labTestCategoryList$: any;

  constructor(
    private labTestCategoryService: LaboratoryService,
    private toast: NgToastService
  ) {}

  @Input() labTestCategoryList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.labTestCategoryList.id;
    this.name = this.labTestCategoryList.name;
    this.description = this.labTestCategoryList.description;
    this.labTestCategoryList$ =
      this.labTestCategoryService.getLabTestCategoryApi();
  }

  addLaboratoryTestCategory() {
    var labTestCategoryList = {
      name: this.name,
      description: this.description,
    };
    console.log(labTestCategoryList);
    this.labTestCategoryService
      .addLabTestCategoryApi(labTestCategoryList)
      .subscribe(
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
  updateLaboratoryTestCategory() {
    var labTestCategoryList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(labTestCategoryList);

    this.labTestCategoryService
      .updateLabTestCategoryApi(id, labTestCategoryList)
      .subscribe(
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

          var showUpdateSuccess = document.getElementById(
            'update-success-alert'
          );
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
