import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-category-form',
  templateUrl: './expense-category-form.component.html',
  styleUrls: ['./expense-category-form.component.css'],
})
export class ExpenseCategoryFormComponent implements OnInit {
  expenseCategoryList$!: Observable<any[]>;

  constructor(
    private expenseCategoryService: ExpenseService,
    private toast: NgToastService
  ) {}

  @Input() expenseCategoryList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.expenseCategoryList.id;
    this.name = this.expenseCategoryList.name;
    this.description = this.expenseCategoryList.description;
    this.expenseCategoryList$ =
      this.expenseCategoryService.getExpenseCategoryApi();
  }

  addExpenseCategory() {
    var expenseCategory = {
      name: this.name,
      description: this.description,
    };
    console.log(expenseCategory);
    this.expenseCategoryService.addExpenseCategoryApi(expenseCategory).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Success',
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
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.expenseCategoryService.updateExpenseCategoryApi(id, expenseCategory).subscribe(
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
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
}
