import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
})
export class PermissionComponent implements OnInit {
  permissionList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activatePermissionComponent: boolean = false;
  PermissionList: any;
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
  fileName = 'permission.xlsx';
  constructor(
    private permissionService: SettingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPermissionList();
  }

  getPermissionList() {
    this.permissionService.getPermissionApi().subscribe((response) => {
      this.permissionList$ = response;
    });
  }

  modalAdd() {
    this.PermissionList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Permission';
    this.activatePermissionComponent = true;
  }

  modalEdit(item: any) {
    this.PermissionList = item;
    this.modalTitle = 'Edit Permission';
    this.activatePermissionComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Permission ${item.id}`)) {
      this.permissionService.deletePermissionApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        this.getPermissionList();
      });
    }
  }
  modalClose() {
    this.activatePermissionComponent = false;
    this.getPermissionList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPermissionList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPermissionList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.permissionList$.filter((res: any) => {
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
    let element = document.getElementById('permission-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
