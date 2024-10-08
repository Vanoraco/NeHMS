import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-blood-group',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.css'],
})
export class BloodGroupComponent implements OnInit {
  bloodGroupList$!: Observable<any[]>;
  fileName = 'bloodGroup.xlsx';
  bloodGroupStatusData$: any;
  // Map to display data associate with foreign keys
  bloodGroupStatusMap: Map<number, string> = new Map();
  constructor(
    private bloodGroupService: UtilityService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.bloodGroupList$ = this.bloodGroupService.getBloodGroupApi();
    this.getBloodGroupStatusMap();
  }
  getBloodGroupStatusMap() {
    this.bloodGroupService.getBloodGroupStatusApi().subscribe((res) => {
      this.bloodGroupStatusData$ = res;
      for (let i = 0; i < res.length; i++) {
        this.bloodGroupStatusMap.set(
          this.bloodGroupStatusData$[i].id,
          this.bloodGroupStatusData$[i].status
        );
      }
    });
  }
  // Variables (properties)
  modalTitle: string = '';
  activateBloodGroupComponent: boolean = false;
  bloodGroupList: any;

  modalAdd() {
    this.bloodGroupList = {
      id: 0,
      name: null,
      bloodGroupStatusId: null,
      descrption: null,
    };
    this.modalTitle = 'Add Blood Group';
    this.activateBloodGroupComponent = true;
  }

  modalEdit(item: any) {
    this.bloodGroupList = item;
    this.modalTitle = 'Edit Blood Group';
    this.activateBloodGroupComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete blood group ${item.id}`)) {
      this.bloodGroupService.deleteBloodGroupApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.bloodGroupList.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
        this.bloodGroupList$ = this.bloodGroupService.getBloodGroupApi();
      });
    }
  }
  modalClose() {
    this.activateBloodGroupComponent = false;
    this.bloodGroupList$ = this.bloodGroupService.getBloodGroupApi();
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
