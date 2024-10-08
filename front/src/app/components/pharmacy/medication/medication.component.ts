import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css'],
})
export class MedicationComponent implements OnInit {
  medicationList$!: Observable<any[]>;
  medicineCategory$: any;
  fileName = 'medication.xlsx';
  // Map to display data associate with foreign keys
  medicineCategoryMap: Map<number, string> = new Map();

  constructor(
    private medicationService: PharmacyService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.medicationList$ = this.medicationService.getMedicationApi();
    this, this.getMedicineCategoryMap();
  }

  getMedicineCategoryMap() {
    this.medicationService.getMedicineCategoryApi().subscribe((data) => {
      this.medicineCategory$ = data;
      for (let i = 0; i < data.length; i++) {
        this.medicineCategoryMap.set(
          this.medicineCategory$[i].id,
          this.medicineCategory$[i].name
        );
      }
    });
  }

  // Variables (properties)
  modalTitle: string = '';
  activatemedicationComponent: boolean = false;
  medicationList: any;

  modalAdd() {
    this.medicationList = {
      id: 0,
      medicineCategoryId: null,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Medication';
    this.activatemedicationComponent = true;
  }

  modalEdit(item: any) {
    this.medicationList = item;
    this.modalTitle = 'Edit Medication';
    this.activatemedicationComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete medication ${item.id}`)) {
      this.medicationService.deleteMedicationApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'Success',
          summary: item.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
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
        this.medicationList$ = this.medicationService.getMedicationApi();
      });
    }
  }
  modalClose() {
    this.activatemedicationComponent = false;
    this.medicationList$ = this.medicationService.getMedicationApi();
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('medication-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
