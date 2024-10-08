import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-blood-group-status',
  templateUrl: './blood-group-status.component.html',
  styleUrls: ['./blood-group-status.component.css'],
})
export class BloodGroupStatusComponent implements OnInit {
  bloodGroupStatusList$!: Observable<any[]>;
  fileName = 'bloodGroupStatus.xlsx';

  constructor(
    private bloodGroupStatusService: UtilityService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.bloodGroupStatusList$ =
      this.bloodGroupStatusService.getBloodGroupStatusApi();
    // this.getExpenseCategoryMap();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateBloodGroupStatusComponent: boolean = false;
  bloodGroupStatusList: any;

  modalAdd() {
    this.bloodGroupStatusList = {
      id: 0,
      name: null,
      amount: 0,
      descrption: null,
    };
    this.modalTitle = 'Add Blood Group Status';
    this.activateBloodGroupStatusComponent = true;
  }

  modalEdit(item: any) {
    this.bloodGroupStatusList = item;
    this.modalTitle = 'Edit Blood Group Status';
    this.activateBloodGroupStatusComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Blood Group Status ${item.id}`)) {
      this.bloodGroupStatusService
        .deleteBloodGroupStatusApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.bloodGroupStatusList.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('bloodgroupStatus-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.bloodGroupStatusList$ =
            this.bloodGroupStatusService.getBloodGroupStatusApi();
        });
    }
  }
  modalClose() {
    this.activateBloodGroupStatusComponent = false;
    this.bloodGroupStatusList$ =
      this.bloodGroupStatusService.getBloodGroupStatusApi();
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('blood-group-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
