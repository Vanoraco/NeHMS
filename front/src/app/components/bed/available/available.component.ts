import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css'],
})
export class AvailableComponent implements OnInit {
  availableList$!: Observable<any[]>;
  fileName = 'available.xlsx';
  // Map to display data associate with foreign keys

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.availableList$ = this.bedService.getAvailableApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateAvailableComponent: boolean = false;
  availableList: any;

  modalAdd() {
    this.availableList = {
      id: 0,
      name: null,
      descrption: null
    };
    this.modalTitle = 'Add Available';
    this.activateAvailableComponent = true;
  }

  modalEdit(item: any) {
    this.availableList = item;
    this.modalTitle = 'Edit Available';
    this.activateAvailableComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Available ${item.id}`)) {
      this.bedService.deleteAvailableApi(item.id).subscribe((res) => {
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
        this.availableList$ = this.bedService.getAvailableApi();
      });
    }
  }
  modalClose() {
    this.activateAvailableComponent = false;
    this.availableList$ = this.bedService.getAvailableApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('available-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
