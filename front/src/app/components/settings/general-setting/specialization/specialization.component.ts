import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-specialization',
  templateUrl: './specialization.component.html',
  styleUrls: ['./specialization.component.css'],
})
export class SpecializationComponent implements OnInit {
  specializationList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateSpecializationComponent: boolean = false;
  specializationList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'specialization.xlsx';
  constructor(
    private specializationService: SettingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getspecializationList();
  }

  getspecializationList() {
    this.specializationService.getSpecializationApi().subscribe((response) => {
      this.specializationList$ = response;
    });
  }

  modalAdd() {
    this.specializationList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Specialization';
    this.activateSpecializationComponent = true;
  }

  modalEdit(item: any) {
    this.specializationList = item;
    this.modalTitle = 'Edit Specialization';
    this.activateSpecializationComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Specialization ${item.id}`)) {
      this.specializationService.deleteSpecializationApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        this.getspecializationList();
      });
    }
  }
  modalClose() {
    this.activateSpecializationComponent = false;
    this.getspecializationList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getspecializationList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getspecializationList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.specializationList$.filter((res: any) => {
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
    let element = document.getElementById('specialization-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
