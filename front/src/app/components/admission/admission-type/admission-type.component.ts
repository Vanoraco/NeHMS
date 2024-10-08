import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-admission-type',
  templateUrl: './admission-type.component.html',
  styleUrls: ['./admission-type.component.css'],
})
export class AdmissionTypeComponent implements OnInit {
  AdmissionTypeList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateAdmissionTypeComponent: boolean = false;
  AdmissionTypes: any;
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
  fileName = 'room.xlsx';
  // Map to display data associate with foreign keys
  constructor(
    private AdmissionTypeService: AdmissionService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAdmissionType();
  }

  getAdmissionType() {
    this.AdmissionTypeService.getAdmissionTypeApi().subscribe((response) => {
      this.AdmissionTypeList$ = response;
    });
  }

  modalAdd() {
    this.AdmissionTypes = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add AdmissionType ';
    this.activateAdmissionTypeComponent = true;
  }

  modalEdit(item: any) {
    this.AdmissionTypes = item;
    this.modalTitle = 'Edit AdmissionType ';
    this.activateAdmissionTypeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete AdmissionType  ${item.id}`)) {
      this.AdmissionTypeService.deleteAdmissionTypeApi(item.id).subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: item.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getAdmissionType();
        }
      );
    }
  }
  modalClose() {
    this.activateAdmissionTypeComponent = false;
    this.getAdmissionType();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAdmissionType();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAdmissionType();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.AdmissionTypeList$.filter((res: any) => {
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
    let element = document.getElementById('admission-type-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
