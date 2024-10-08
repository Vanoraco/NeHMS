import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { RevenueService } from 'src/app/services/revenue.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-revenue-category',
  templateUrl: './revenue-category.component.html',
  styleUrls: ['./revenue-category.component.css'],
})
export class RevenueCategoryComponent implements OnInit {
  revenueCategoryList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateRevenueCategoryComponent: boolean = false;
  revenueCategoryList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'revenue-cat.xlsx';
  constructor(
    private revenueCategoryService: RevenueService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getRevenueCategoryList();
  }

  getRevenueCategoryList() {
    this.revenueCategoryService.getRevenueCategoryApi().subscribe((response) => {
      this.revenueCategoryList$ = response;
    });
  }

  modalAdd() {
    this.revenueCategoryList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Revenue Category';
    this.activateRevenueCategoryComponent = true;
  }

  modalEdit(item: any) {
    this.revenueCategoryList = item;
    this.modalTitle = 'Edit Revenue Category';
    this.activateRevenueCategoryComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete revenue category ${item.id}`)) {
      this.revenueCategoryService.deleteRevenueCategoryApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getRevenueCategoryList();
      });
    }
  }
  modalClose() {
    this.activateRevenueCategoryComponent = false;
    this.getRevenueCategoryList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getRevenueCategoryList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRevenueCategoryList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.revenueCategoryList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('revenue-cat-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
