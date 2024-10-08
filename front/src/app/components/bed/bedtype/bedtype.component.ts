import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bedtype',
  templateUrl: './bedtype.component.html',
  styleUrls: ['./bedtype.component.css'],
})
export class BedtypeComponent implements OnInit {
  bedtypeList$!: Observable<any[]>;

  // Map to display data associate with foreign keys

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.bedtypeList$ = this.bedService.getBedTypeApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateBedTypeComponent: boolean = false;
  bedtypeList: any;
  fileName = 'bedtype.xlsx';
  modalAdd() {
    this.bedtypeList = {
      id: 0,
      name: null,
      descrption: null,
      price: null,
    };
    this.modalTitle = 'Add Bed Type';
    this.activateBedTypeComponent = true;
  }

  modalEdit(item: any) {
    this.bedtypeList = item;
    this.modalTitle = 'Edit Bed Type';
    this.activateBedTypeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Bed Type ${item.id}`)) {
      this.bedService.deleteBedTypeApi(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showDeleteSuccess = document.getElementById('delete-success-alert');
        if (showDeleteSuccess) {
          showDeleteSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'none';
          }
        }, 4000);
        this.bedtypeList$ = this.bedService.getBedTypeApi();
      });
    }
  }
  modalClose() {
    this.activateBedTypeComponent = false;
    this.bedtypeList$ = this.bedService.getBedTypeApi();
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
