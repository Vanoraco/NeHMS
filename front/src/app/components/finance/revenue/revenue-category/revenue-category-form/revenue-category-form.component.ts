import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { RevenueService } from 'src/app/services/revenue.service';

@Component({
  selector: 'app-revenue-category-form',
  templateUrl: './revenue-category-form.component.html',
  styleUrls: ['./revenue-category-form.component.css'],
})
export class RevenueCategoryFormComponent implements OnInit {
  revenueCategoryList$: any;
  revenueForm: FormGroup | undefined;
  constructor(
    private revenueCategoryService: RevenueService,
    private toast: NgToastService
  ) {}

  @Input() revenueCategoryList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.revenueCategoryList.id;
    this.name = this.revenueCategoryList.name;
    this.description = this.revenueCategoryList.description;
    this.revenueCategoryList$ =
      this.revenueCategoryService.getRevenueCategoryApi();
  }

  addRevenueCategory() {
    var revenueCategoryList = {
      name: this.name,
      description: this.description,
    };
    console.log(revenueCategoryList);
    this.revenueCategoryService
      .addRevenueCategoryApi(revenueCategoryList)
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
  updateRevenueCategory() {
    var revenueCategoryList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(revenueCategoryList);

    this.revenueCategoryService
      .updateRevenueCategoryApi(id, revenueCategoryList)
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
