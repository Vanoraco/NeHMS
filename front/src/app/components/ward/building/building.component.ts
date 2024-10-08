import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css'],
})
export class BuildingComponent implements OnInit {
  buildingList$!: Observable<any[]>;
  fileName = 'building.xlsx';
  // Map to display data associate with foreign keys

  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.buildingList$ = this.bedService.getBuildingApi();
  }
  
  // Variables (properties)
  modalTitle: string = '';
  activateBuildingComponent: boolean = false;
  buildingList: any;

  modalAdd() {
    this.buildingList = {
      id: 0,
      name: null,
      code: null,
      descrption: null,
    };
    this.modalTitle = 'Add Building';
    this.activateBuildingComponent = true;
  }

  modalEdit(item: any) {
    this.buildingList = item;
    this.modalTitle = 'Edit Building';
    this.activateBuildingComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete building id : '${item.id}'`)) {
      this.bedService.deleteBuildingApi(item.id).subscribe((res) => {
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
        this.buildingList$ = this.bedService.getBuildingApi();
      });
    }
  }

  modalClose() {
    this.activateBuildingComponent = false;
    this.buildingList$ = this.bedService.getBuildingApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('building-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
