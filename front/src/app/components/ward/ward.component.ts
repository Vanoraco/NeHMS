import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css'],
})
export class WardComponent implements OnInit {
  wardList$!: Observable<any[]>;
  fileName = 'ward.xlsx';
  // Map to display data associate with foreign keys

  constructor(private bedService: BedService, public router:Router) {}

  ngOnInit(): void {
    this.wardList$ = this.bedService.getWardApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateWardComponent: boolean = false;
  wardList: any;

  modalAdd() {
    this.wardList = {
      id: 0,
      name: null,
      buildingNumberId: null,
      floorNumber: null,
      wardTypeId: null,
      code: 0,
      isprivate: null
    };
    this.modalTitle = 'Add Ward';
    this.activateWardComponent = true;
  }

  modalEdit(item: any) {
    this.wardList = item;
    this.modalTitle = 'Edit Ward';
    this.activateWardComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete ward ${item.id}`)) {
      this.bedService.deleteWardApi(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.wardList$ = this.bedService.getWardApi();
      });
    }
  }
  modalClose() {
    this.activateWardComponent = false;
    this.wardList$ = this.bedService.getWardApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('ward-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
