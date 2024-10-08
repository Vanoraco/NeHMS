import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-inventory-supplier',
  templateUrl: './inventory-supplier.component.html',
  styleUrls: ['./inventory-supplier.component.css'],
})
export class InventorySupplierComponent implements OnInit {
  invSupplierList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateInvSupplierComponent: boolean = false;
  invSupplierList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];
  fileName = '=inventory-supplier.xlsx';
  // Map to display data associate with foreign keys
  constructor(
    private invSupplierService: ExpenseService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getInventorySupplier();
  }

  getInventorySupplier() {
    this.invSupplierService.getInventorySupplierApi().subscribe((response) => {
      this.invSupplierList$ = response;
    });
  }

  modalAdd() {
    this.invSupplierList = {
      id: 0,
      name: null,
      address: null,
      phoneNumber: 0,
      descrption: null,
    };
    this.modalTitle = 'Add Inventory Supplier';
    this.activateInvSupplierComponent = true;
  }

  modalEdit(item: any) {
    this.invSupplierList = item;
    this.modalTitle = 'Edit Inventory Supplier';
    this.activateInvSupplierComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete inventory supplier ${item.id}`)
    ) {
      this.invSupplierService
        .deleteInventorySupplierApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: item.name + ' Sucessfully Deleted!',
            duration: 4000,
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
          this.getInventorySupplier();
        });
    }
  }
  modalClose() {
    this.activateInvSupplierComponent = false;
    this.getInventorySupplier();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getInventorySupplier();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getInventorySupplier();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.invSupplierList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('inventory-supplier-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
