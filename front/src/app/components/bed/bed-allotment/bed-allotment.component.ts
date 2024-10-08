import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bed-allotment',
  templateUrl: './bed-allotment.component.html',
  styleUrls: ['./bed-allotment.component.css'],
})
export class BedAllotmentComponent implements OnInit {
  bedAllotment$!: Observable<any[]>;
  patientList$: any;
  bedList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateBedAllotmentComponent: boolean = false;
  bedAllotment: any;
  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();
  bedListMap: Map<number, string> = new Map();
  fileName = 'bed_allotment.xlsx';
  constructor(
    private bedService: BedService,
    private patientService: PatientService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.bedAllotment$ = this.bedService.getBedAllotmentApi();
    this.getBedNameMap();
    this.getPatientNameMap();
  }

  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((data) => {
      this.patientList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.patientListMap.set(
          this.patientList$[i].id,
          this.patientList$[i].firstName +
            ' ' +
            this.patientList$[i].lastName +
            ` (${this.patientList$[i].id})`
        );
      }
    });
  }
  getBedNameMap() {
    this.bedService.getBedApi().subscribe((res) => {
      this.bedList$ = res;
      for (let i = 0; i < res.length; i++) {
        this.bedListMap.set(
          this.bedList$[i].id,
          this.bedList$[i].name
        );
      }
    });
  }
  modalAdd() {
    this.bedAllotment = {
      id: 0,
      allotedDate: null,
      discourageDate: null,
      bedId: null,
      patientId: null,
    };
    this.modalTitle = 'Add Bed Allotment';
    this.activateBedAllotmentComponent = true;
  }

  modalEdit(item: any) {
    this.bedAllotment = item;
    this.modalTitle = 'Edit Bed Allotment';
    this.activateBedAllotmentComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Bed Allotment ${item.id}`)) {
      this.bedService.deleteBedAllotmentApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Successfully Deleted!! ',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.bedAllotment$ = this.bedService.getBedAllotmentApi();
      });
    }
  }

  modalClose() {
    this.activateBedAllotmentComponent = false;
    this.bedAllotment$ = this.bedService.getBedAllotmentApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('bed-allotment-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
