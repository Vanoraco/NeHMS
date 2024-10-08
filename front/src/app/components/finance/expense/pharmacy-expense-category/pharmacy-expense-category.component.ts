import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-pharmacy-expense-category',
  templateUrl: './pharmacy-expense-category.component.html',
  styleUrls: ['./pharmacy-expense-category.component.css'],
})
export class PharmacyExpenseCategoryComponent implements OnInit {
  expenseCategoryList$!: Observable<any[]>;
  fileName = 'pharmacy-expense-category.xlsx';
  constructor(
    private expenseCategoryService: ExpenseService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.expenseCategoryList$ =
      this.expenseCategoryService.getPharmacyExpenseCategoryApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateExpenseCategoryComponent: boolean = false;
  expenseCategoryList: any;

  modalAdd() {
    this.expenseCategoryList = {
      id: 0,
      catagory: null,
      descrption: null,
    };
    this.modalTitle = 'Add Pharmacy Expense Category';
    this.activateExpenseCategoryComponent = true;
  }

  modalEdit(item: any) {
    this.expenseCategoryList = item;
    this.modalTitle = 'Edit Pharmacy Expense Category';
    this.activateExpenseCategoryComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete pharmacy pxpense category ${item.id}`
      )
    ) {
      this.expenseCategoryService
        .deletePharmacyExpenseCategoryApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'Success',
            summary: item.catagory + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.expenseCategoryList$ =
            this.expenseCategoryService.getPharmacyExpenseCategoryApi();
        });
    }
  }
  modalClose() {
    this.activateExpenseCategoryComponent = false;
    this.expenseCategoryList$ =
      this.expenseCategoryService.getPharmacyExpenseCategoryApi();
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
