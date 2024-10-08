import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bed',
  templateUrl: './bed.component.html',
  styleUrls: ['./bed.component.css'],
})
export class BedComponent implements OnInit {
  bedList$!: Observable<any[]>;
  wardList$!: Observable<any[]>;
  availableList$!: Observable<any[]>;
  bedTypeList$!: Observable<any[]>;

  bedTypeMap: Map<number, string> = new Map();
  availableMap: Map<number, string> = new Map();
  wardMap: Map<number, string> = new Map();
  fileName = 'bed.xlsx';
  constructor(private bedService: BedService, public router: Router) {}

  ngOnInit(): void {
    this.bedList$ = this.bedService.getBedApi();
    this.getBedTypeMap();
    this.getAvailableMap();
    this.getWardMap();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateBedComponent: boolean = false;
  bedList: any;

  modalAdd() {
    this.bedList = {
      id: 0,
      name: null,
      wardId: null,
      bedTypeId: null,
      availableId: null,
      code: 0,
      descrption: null,
    };
    this.modalTitle = 'Add Bed';
    this.activateBedComponent = true;
  }

  getBedTypeMap() {
    this.bedService.getBedTypeApi().subscribe((res) => {
      this.bedTypeList$ = res;
      for (let i = 0; i < res.length; i++) {
        this.bedTypeMap.set(this.bedTypeList$[i].id, this.bedTypeList$[i].name);
      }
    });
  }
  getAvailableMap() {
    this.bedService.getAvailableApi().subscribe((res) => {
      this.availableList$ = res;
      for (let i = 0; i < res.length; i++) {
        this.availableMap.set(
          this.availableList$[i].id,
          this.availableList$[i].name
        );
      }
    });
  }
  getWardMap() {
    this.bedService.getWardApi().subscribe((res) => {
      this.wardList$ = res;
      for (let i = 0; i < res.length; i++) {
        this.wardMap.set(this.wardList$[i].id, this.wardList$[i].name);
      }
    });
  }

  modalEdit(item: any) {
    this.bedList = item;
    this.modalTitle = 'Edit Bed';
    this.activateBedComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete bed ${item.id}`)) {
      this.bedService.deleteBedApi(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.bedList$ = this.bedService.getBedApi();
      });
    }
  }
  modalClose() {
    this.activateBedComponent = false;
    this.bedList$ = this.bedService.getBedApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('bed-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
