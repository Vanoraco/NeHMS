import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medicine-supplier',
  templateUrl: './medicine-supplier.component.html',
  styleUrls: ['./medicine-supplier.component.css'],
})
export class MedicineSupplierComponent implements OnInit {
  medSupplierList$!: Observable<any[]>;
  fileName = 'med-sup.xlsx';
  // Map to display data associate with foreign keys

  constructor(
    private medSupplierService: PharmacyService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.medSupplierList$ = this.medSupplierService.getMedSupplierApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateMedSupplierComponent: boolean = false;
  medSupplierList: any;

  modalAdd() {
    this.medSupplierList = {
      id: 0,
      name: null,
      address: null,
      phoneNumber: 0,
      descrption: null,
    };
    this.modalTitle = 'Add Medicine Supplier';
    this.activateMedSupplierComponent = true;
  }

  modalEdit(item: any) {
    this.medSupplierList = item;
    this.modalTitle = 'Edit Medicine Supplier';
    this.activateMedSupplierComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete medicine supplier ${item.id}`)
    ) {
      this.medSupplierService.deleteMedSupplierApi(item.id).subscribe((res) => {
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
        this.medSupplierList$ = this.medSupplierService.getMedSupplierApi();
      });
    }
  }
  modalClose() {
    this.activateMedSupplierComponent = false;
    this.medSupplierList$ = this.medSupplierService.getMedSupplierApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('med-sup-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
