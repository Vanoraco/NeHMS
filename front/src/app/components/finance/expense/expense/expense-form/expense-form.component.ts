import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css'],
})
export class ExpenseFormComponent implements OnInit {
  expenseList$!: Observable<any[]>;
  expenseCategoryId$!: Observable<any[]>;

  constructor(
    private expenseService: ExpenseService,
    private toast: NgToastService
  ) {}

  @Input() expenseList: any;
  id: number = 0;
  expenseCatagoryId: number = 0;
  amount: number = 0;
  name: string = '';
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.expenseList.id;
    this.expenseCatagoryId = this.expenseList.expenseCatagoryId;
    this.amount = this.expenseList.amount;
    this.name = this.expenseList.name;
    this.date = this.expenseList.date;
    this.description = this.expenseList.description;

    this.expenseList$ = this.expenseService.getExpenseApi();
    this.expenseCategoryId$ = this.expenseService.getExpenseCategoryApi();
  }

  addExpense() {
    var expenseList = {
      expenseCatagoryId: +this.expenseCatagoryId,
      amount: +this.amount,
      name: this.name,
      date: this.date,
      description: this.description,
    };
    console.log(expenseList);
    this.expenseService.addExpenseApi(expenseList).subscribe(
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
          detail: 'Error',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updateExpense() {
    var expenseList = {
      id: this.id,
      expenseCatagoryId: +this.expenseCatagoryId,
      amount: +this.amount,
      name: this.name,
      date: this.date,
      description: this.description,
    };
    var id: number = this.id;
    this.expenseService.updateExpenseApi(id, expenseList).subscribe(
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
