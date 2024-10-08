import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-pharmacy-med-stock',
  templateUrl: './pharmacy-med-stock.component.html',
  styleUrls: ['./pharmacy-med-stock.component.css'],
})
export class 
PharmacyMedStockComponent implements OnInit {
  medStockList$!: Observable<any[]>;
  employeeId$: any;
  supplierId$: any;
  fileName = 'pharmacy-med-stock.xlsx';
  //Map to display data associate with foreign keys
  employeeMap: Map<number, string> = new Map();
  medSupplierMap: Map<number, string> = new Map();

  constructor(
    private medStockService: PharmacyService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.medStockList$ = this.medStockService.getPharmacyMedStockApi();
    this.getEmployeeMap();
    this.getMedSupplierMap();
  }

  getEmployeeMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeId$[i].id,
          this.employeeId$[i].firstName +
            ' ' +
            this.employeeId$[i].lastName +
            ` (${this.employeeId$[i].id})`
        );
      }
    });
  }
  getMedSupplierMap() {
    this.medStockService.getMedSupplierApi().subscribe((data) => {
      this.supplierId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.medSupplierMap.set(
          this.supplierId$[i].id,
          this.supplierId$[i].name
        );
      }
    });
  }

  // Variables (properties)
  modalTitle: string = '';
  activatePharmacyMedStockComponent: boolean = false;
  pharmacyMedStocks: any;

  modalAdd() {
    this.pharmacyMedStocks = {
      id: 0,
      quantity: 0,
      price: 0,
      employeeId: null,
      medicationId: null,
      batchNumber: null,
      expirationDate: null,
      timeStamp: null,
      medSupplierId: null,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Pharmacy Medicine Stock';
    this.activatePharmacyMedStockComponent = true;
  }

  modalEdit(item: any) {
    this.pharmacyMedStocks = item;
    this.modalTitle = 'Edit Pharmacy Medicine Stock';
    this.activatePharmacyMedStockComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete pharmacy medicine stock ${item.id}`
      )
    ) {
      this.medStockService
        .deletePharmacyMedStockApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'Success',
            summary: item.name + ' Sucessfully Deleted!',
            duration: 400,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          var showDeleteSuccess = document.getElementById(
            'delete-success-alert'
          );
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'block';
          }
          setTimeout(function () {
            if (showDeleteSuccess) {
              showDeleteSuccess.style.display = 'none';
            }
          }, 4000);
          this.medStockList$ = this.medStockService.getPharmacyMedStockApi();
        });
    }
  }
  modalClose() {
    this.activatePharmacyMedStockComponent = false;
    this.medStockList$ = this.medStockService.getPharmacyMedStockApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('pharmacy-med-stock-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
