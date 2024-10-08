import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css'],
})
export class ExpenseComponent implements OnInit {
  expenseList$!: Observable<any[]>;
  fileName = 'expense.xlsx';
  expenseCategoryData$: any;
  // Map to display data associate with foreign keys
  expenseCategoryMap: Map<number, string> = new Map();
  constructor(
    private expenseService: ExpenseService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.expenseList$ = this.expenseService.getExpenseApi();
    this.getExpenseCategoryMap();
  }
  getExpenseCategoryMap() {
    this.expenseService.getExpenseCategoryApi().subscribe((res) => {
      this.expenseCategoryData$ = res;
      for (let i = 0; i < res.length; i++) {
        this.expenseCategoryMap.set(
          this.expenseCategoryData$[i].id,
          this.expenseCategoryData$[i].name
        );
      }
    });
  }
  // Variables (properties)
  modalTitle: string = '';
  activateExpenseComponent: boolean = false;
  expenseList: any;

  modalAdd() {
    this.expenseList = {
      id: 0,
      name: null,
      expenseCatagoryId: null,
      amount: 0,
      date: null,
      descrption: null,
    };
    this.modalTitle = 'Add Expense';
    this.activateExpenseComponent = true;
  }

  modalEdit(item: any) {
    this.expenseList = item;
    this.modalTitle = 'Edit Expense';
    this.activateExpenseComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete expense ${item.id}`)) {
      this.expenseService.deleteExpenseApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.expenseList.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.expenseList$ = this.expenseService.getExpenseApi();
      });
    }
  }
  modalClose() {
    this.activateExpenseComponent = false;
    this.expenseList$ = this.expenseService.getExpenseApi();
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('expense-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
