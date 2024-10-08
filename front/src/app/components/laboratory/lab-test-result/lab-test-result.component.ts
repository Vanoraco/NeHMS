import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-lab-test-result',
  templateUrl: './lab-test-result.component.html',
  styleUrls: ['./lab-test-result.component.css'],
})
export class LabTestResultComponent implements OnInit {
  labTestResult$: any = [];
  // Variables (properties)
  modalTitle: string = '';
  activateLabTestResultComponent: boolean = false;
  labTestResult: any;
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
  fileName = 'lab-test-result.xlsx';
  // Map to display data associate with foreign keys
  constructor(
    private labTestResultService: LaboratoryService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getlabTestResult();
  }

  getlabTestResult() {
    this.labTestResultService.getLabTestResultApi().subscribe((response) => {
      this.labTestResult$ = response;
    });
  }

  modalAdd() {
    this.labTestResult = {
      id: 0,
      name: null,
      result: null,
      labRequestId: null,
      laboratoryTestTypeId: null,
      description: null,
    };
    this.modalTitle = 'Add Laboratory Test Result';
    this.activateLabTestResultComponent = true;
  }

  modalEdit(item: any) {
    this.labTestResult = item;
    this.modalTitle = 'Edit Laboratory Test Result';
    this.activateLabTestResultComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete laboratory Result ${item.id}`)
    ) {
      this.labTestResultService
        .deleteLabTestResultApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.labTestResult.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          document.getElementById('add-edit-modal-close').click();
          this.getlabTestResult();
        });
    }
  }
  modalClose() {
    this.activateLabTestResultComponent = false;
    this.getlabTestResult();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getlabTestResult();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getlabTestResult();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.labTestResult$.filter((res: any) => {
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
    let element = document.getElementById('lab-test-result-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
