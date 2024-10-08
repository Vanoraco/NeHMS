import { Component, OnInit, ViewChild } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { PharmacySalesFormComponent } from './pharmacy-sales-form/pharmacy-sales-form.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pharmacy-sales',
  templateUrl: './pharmacy-sales.component.html',
  styleUrls: ['./pharmacy-sales.component.css'],
})
export class PharmacySalesComponent implements OnInit {
  pharmacySalesList$!: any;
  fileName = 'pharmacy-sales-report.xlsx';
  // Map to display data associate with foreign keys
  @ViewChild(PharmacySalesFormComponent)
  pharmacySalesModal!: PharmacySalesFormComponent;
  key: string = 'id';
  reverse: boolean = false;

  constructor(
    private phaSaleService: PharmacyService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAllPharmacySales();
  }
  getAllPharmacySales() {
    this.phaSaleService.getPharmacySaleApi().subscribe((res) => {
      this.pharmacySalesList$ = res.reverse();
    });
  }

  // Variables (properties)
  modalTitle: string = '';
  activatePhaSalesComponent: boolean = false;
  pharmacySalesList: any;

  modalAdd() {
    this.pharmacySalesList = {
      id: 0,
      pahrmacyMedStockId: null,
      amount: 0,
      price: 0,
      employeeId: null,
      timeStamp: null,
      descrption: null,
    };
    this.modalTitle = 'Add Pharmacy Sales';
    this.activatePhaSalesComponent = true;
  }

  modalEdit(id: number) {
    this.pharmacySalesModal.loadEditData(id);
    this.modalTitle = 'Edit Pharmacy Sales';
    this.activatePhaSalesComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete pharmacy sales ${item.id}`)) {
      this.phaSaleService.deletePharmacySaleApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAllPharmacySales();
      });
    }
  }

  modalPrint(item: any) {
    this.pharmacySalesList = item;
    this.modalTitle = 'View Detail and Print';
    this.activatePhaSalesComponent = true;
  }

  modalClose() {
    this.activatePhaSalesComponent = false;
    this.getAllPharmacySales();
  }

  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
