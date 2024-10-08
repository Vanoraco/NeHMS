import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-phaexpense-category-form',
  templateUrl: './phaexpense-category-form.component.html',
  styleUrls: ['./phaexpense-category-form.component.css'],
})
export class PhaexpenseCategoryFormComponent implements OnInit {
  expenseCategoryList$!: Observable<any[]>;

  constructor(
    private expenseCategoryService: ExpenseService,
    private toast: NgToastService
  ) {}

  @Input() expenseCategoryList: any;
  id: number = 0;
  catagory: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.expenseCategoryList.id;
    this.catagory = this.expenseCategoryList.catagory;
    this.description = this.expenseCategoryList.description;
    this.expenseCategoryList$ =
      this.expenseCategoryService.getPharmacyExpenseCategoryApi();
  }

  addExpenseCategory() {
    var expenseCategory = {
      catagory: this.catagory,
      description: this.description,
    };
    console.log(expenseCategory);
    this.expenseCategoryService.addPharmacyExpenseCategoryApi(expenseCategory).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Success',
          summary: this.catagory + ' Sucessfully Added!',
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
          detail: 'Error',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updateExpenseCategory() {
    var expenseCategory = {
      id: this.id,
      catagory: this.catagory,
      description: this.description,
    };
    var id: number = this.id;
    this.expenseCategoryService.updatePharmacyExpenseCategoryApi(id, expenseCategory).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.catagory + ' Sucessfully Updated!',
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
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
}
