import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-laboratory-test-category',
  templateUrl: './laboratory-test-category.component.html',
  styleUrls: ['./laboratory-test-category.component.css'],
})
export class LaboratoryTestCategoryComponent implements OnInit {
  labTestCategoryList$: any;
  fileName = 'lab-test-category.xlsx';
  // Variables (properties)
  modalTitle: string = '';
  activateLabTestCategoryComponent: boolean = false;
  labTestCategoryList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];

  // Map to display data associate with foreign keys
  constructor(
    private labTestCategoryService: LaboratoryService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getLabTestCategoryList();
  }

  getLabTestCategoryList() {
    this.labTestCategoryService
      .getLabTestCategoryApi()
      .subscribe((response) => {
        this.labTestCategoryList$ = response;
      });
  }

  modalAdd() {
    this.labTestCategoryList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Laboratory Test Category';
    this.activateLabTestCategoryComponent = true;
  }

  modalEdit(item: any) {
    this.labTestCategoryList = item;
    this.modalTitle = 'Edit Laboratory Test Category';
    this.activateLabTestCategoryComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete laboratory category ${item.id}`)
    ) {
      this.labTestCategoryService
        .deleteLabTestCategoryApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.labTestCategoryList.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          document.getElementById('add-edit-modal-close').click();
          this.getLabTestCategoryList();
        });
    }
  }
  modalClose() {
    this.activateLabTestCategoryComponent = false;
    this.getLabTestCategoryList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getLabTestCategoryList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getLabTestCategoryList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.labTestCategoryList$.filter((res: any) => {
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
    let element = document.getElementById('lab-test-category-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
