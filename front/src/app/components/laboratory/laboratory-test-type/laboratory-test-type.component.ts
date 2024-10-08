import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Employee } from 'src/app/model/employeemodel';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-laboratory-test-type',
  templateUrl: './laboratory-test-type.component.html',
  styleUrls: ['./laboratory-test-type.component.css'],
})
export class LaboratoryTestTypeComponent implements OnInit {
  labTestTypeList$: any;
  labTestCategoryId$: any;

  //Map to display data associate with foreign keys
  labTestCategoryMap: Map<number, string> = new Map();

  // Variables (properties)
  modalTitle: string = '';
  activateLabTestTypeComponent: boolean = false;
  labTestTypeList: any;
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
  fileName = 'lab-test-type.xlsx';
  // Map to display data associate with foreign keys
  constructor(
    private labTestTypeService: LaboratoryService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getLabTestTypeList();
    this.getLabTestCategoryMap();
  }

  getLabTestTypeList() {
    this.labTestTypeService.getLabTestTypeApi().subscribe((response) => {
      this.labTestTypeList$ = response;
    });
  }

  getLabTestCategoryMap() {
    this.labTestTypeService.getLabTestCategoryApi().subscribe((data) => {
      this.labTestCategoryId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.labTestCategoryMap.set(
          this.labTestCategoryId$[i].id,
          this.labTestCategoryId$[i].name
        );
      }
    });
  }

  modalAdd() {
    this.labTestTypeList = {
      id: 0,
      name: null,
      laboratoryTestCategoryId: null,
      descrption: null,
    };
    this.modalTitle = 'Add Laboratory Test Type';
    this.activateLabTestTypeComponent = true;
  }

  modalEdit(item: any) {
    this.labTestTypeList = item;
    this.modalTitle = 'Edit Laboratory Test Type';
    this.activateLabTestTypeComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete laboratory test type ${item.id}`)
    ) {
      this.labTestTypeService.deleteLabTestTypeApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getLabTestTypeList();
      });
    }
  }
  modalClose() {
    this.activateLabTestTypeComponent = false;
    this.getLabTestTypeList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getLabTestTypeList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getLabTestTypeList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.labTestTypeList$.filter((res: any) => {
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
    let element = document.getElementById('lab-test-type-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
