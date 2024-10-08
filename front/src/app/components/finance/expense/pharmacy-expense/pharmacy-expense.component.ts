import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-pharmacy-expense',
  templateUrl: './pharmacy-expense.component.html',
  styleUrls: ['./pharmacy-expense.component.css'],
})
export class PharmacyExpenseComponent implements OnInit {
  pharmacyExpenseList$!: Observable<any[]>;
  fileName = 'pharmacy-expense.xlsx';
  expenseCategoryData$: any;

  // Map to display data associate with foreign keys
  expenseCategoryMap: Map<number, string> = new Map();

  constructor(
    private expenseService: ExpenseService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.pharmacyExpenseList$ = this.expenseService.getPharmacyExpenseApi();
    this.pharmacyExpenseCategoryMap();
  }

  pharmacyExpenseCategoryMap() {
    this.expenseService.getPharmacyExpenseCategoryApi().subscribe((res) => {
      this.expenseCategoryData$ = res;
      for (let i = 0; i < res.length; i++) {
        this.expenseCategoryMap.set(
          this.expenseCategoryData$[i].id,
          this.expenseCategoryData$[i].catagory
        );
      }
    });
  }
  // Variables (properties)
  modalTitle: string = '';
  activateExpenseComponent: boolean = false;
  pharmacyExpenseList: any;

  modalAdd() {
    this.pharmacyExpenseList = {
      id: 0,
      pharmacyExpenseCatagoryId: null,
      amount: 0,
      date: null,
      descrption: null,
    };
    this.modalTitle = 'Add Pharmacy Expense';
    this.activateExpenseComponent = true;
  }

  modalEdit(item: any) {
    this.pharmacyExpenseList = item;
    this.modalTitle = 'Edit Pharmacy Expense';
    this.activateExpenseComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete pharmacy expense ${item.id}`)
    ) {
      this.expenseService.deletePharmacyExpenseApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.pharmacyExpenseList$ = this.expenseService.getPharmacyExpenseApi();
      });
    }
  }
  modalClose() {
    this.activateExpenseComponent = false;
    this.pharmacyExpenseList$ = this.expenseService.getPharmacyExpenseApi();
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('pharmacy-expense-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
