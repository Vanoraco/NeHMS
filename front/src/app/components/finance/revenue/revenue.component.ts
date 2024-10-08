import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/model/employeemodel';
import { RevenueService } from 'src/app/services/revenue.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css'],
})
export class RevenueComponent implements OnInit {
  revenueList$: any = [];
  revenueCategoryId$: any;

  //Map to display data associate with foreign keys
  revenueCategoryMap: Map<number, string> = new Map();

  // Variables (properties)
  modalTitle: string = '';
  activateRevenueComponent: boolean = false;
  revenueList: any;
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
  fileName = 'revenue.xlsx';
  constructor(
    private revenueService: RevenueService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getRevenueList();
    this.refreshRevenueCategoryMap();
  }

  getRevenueList() {
    this.revenueService.getRevenueApi().subscribe((response) => {
      this.revenueList$ = response;
    });
  }

  refreshRevenueCategoryMap() {
    this.revenueService.getRevenueCategoryApi().subscribe((res) => {
      this.revenueCategoryId$ = res;
      for (let i = 0; i < res.length; i++) {
        this.revenueCategoryMap.set(
          this.revenueCategoryId$[i].id,
          this.revenueCategoryId$[i].name
        );
      }
    });
  }

  modalAdd() {
    this.revenueList = {
      id: 0,
      amount: 0,
      revenueCategoryId: null,
      date: null,
      descrption: null,
    };
    this.modalTitle = 'Add Revenue';
    this.activateRevenueComponent = true;
  }

  modalEdit(item: any) {
    this.revenueList = item;
    this.modalTitle = 'Edit Revenue';
    this.activateRevenueComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete revenue ${item.id}`)) {
      this.revenueService.deleteRevenueApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        this.getRevenueList();
      });
    }
  }

  modalClose() {
    this.activateRevenueComponent = false;
    this.getRevenueList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getRevenueList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRevenueList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.revenueList$.filter((res: any) => {
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
    let element = document.getElementById('revenue-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
