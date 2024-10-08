import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-pharmacy-expense-form',
  templateUrl: './pharmacy-expense-form.component.html',
  styleUrls: ['./pharmacy-expense-form.component.css'],
})
export class PharmacyExpenseFormComponent implements OnInit {
  pharmacyExpenseList$!: Observable<any[]>;
  expenseCategoryId$!: Observable<any[]>;

  constructor(
    private pharmacyExpenseService: ExpenseService,
    private toast: NgToastService
  ) {}

  @Input() pharmacyExpenseList: any;
  id: number = 0;
  pharmacyExpenseCatagoryId: number = 0;
  amount: number = 0;
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.pharmacyExpenseList.id;
    this.pharmacyExpenseCatagoryId =
      this.pharmacyExpenseList.pharmacyExpenseCatagoryId;
    this.amount = this.pharmacyExpenseList.amount;
    this.date = this.pharmacyExpenseList.date;
    this.description = this.pharmacyExpenseList.description;
    this.pharmacyExpenseList$ =
      this.pharmacyExpenseService.getPharmacyExpenseApi();
    this.expenseCategoryId$ =
      this.pharmacyExpenseService.getPharmacyExpenseCategoryApi();
  }

  addPharmacyExpense() {
    var pharmacyExpenseList = {
      pharmacyExpenseCatagoryId: +this.pharmacyExpenseCatagoryId,
      amount: +this.amount,
      date: this.date,
      description: this.description,
    };
    console.log(pharmacyExpenseList);
    this.pharmacyExpenseService
      .addPharmacyExpenseApi(pharmacyExpenseList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Sucessfully Added!',
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
  updatePharmacyExpense() {
    var pharmacyExpenseList = {
      id: this.id,
      pharmacyExpenseCatagoryId: +this.pharmacyExpenseCatagoryId,
      amount: +this.amount,
      date: this.date,
      description: this.description,
    };
    var id: number = this.id;
    this.pharmacyExpenseService
      .updatePharmacyExpenseApi(id, pharmacyExpenseList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Sucessfully Updated!',
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
