import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-wardtype',
  templateUrl: './wardtype.component.html',
  styleUrls: ['./wardtype.component.css'],
})
export class WardtypeComponent implements OnInit {
  wardTypeList$!: Observable<any[]>;
  fileName = 'wardtype.xlsx';
  // Map to display data associate with foreign keys

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.wardTypeList$ = this.bedService.getWardTypeApi();
  }
  Price = 2000;

  // Variables (properties)
  modalTitle: string = '';
  activateWardTypeComponent: boolean = false;
  wardTypeList: any;

  modalAdd() {
    this.wardTypeList = {
      id: 0,
      name: null,
      descrption: null,
      price: null,
    };
    this.modalTitle = 'Add Ward Type';
    this.activateWardTypeComponent = true;
  }

  modalEdit(item: any) {
    this.wardTypeList = item;
    this.modalTitle = 'Edit Ward Type';
    this.activateWardTypeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete bed type ${item.id}`)) {
      this.bedService.deleteWardTypeApi(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.wardTypeList$ = this.bedService.getWardTypeApi();
      });
    }
  }
  modalClose() {
    this.activateWardTypeComponent = false;
    this.wardTypeList$ = this.bedService.getWardTypeApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('wardtype-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
