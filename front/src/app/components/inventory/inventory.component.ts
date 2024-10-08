import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseService } from 'src/app/services/expense.service';
// import { ngxCsv } from 'ngx-csv/ngx-csv';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventoryList$: any;
  employeeId$: any;
  supplierId$: any;
  fileName = 'inventory.xlsx';
  //Map to display data associate with foreign keys
  employeeMap: Map<number, string> = new Map();
  invSupplierMap: Map<number, string> = new Map();

  // Variables (properties)
  modalTitle: string = '';
  activateInventoryComponent: boolean = false;
  inventories: any;
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

  // Map to display data associate with foreign keys
  constructor(
    private inventoryService: ExpenseService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getInventories();
    this.getEmployeeMap();
    this.getInvetorySupplierMap();
  }

  getInventories() {
    this.inventoryService.getInventoryApi().subscribe((response) => {
      this.inventoryList$ = response;
    });
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
  getInvetorySupplierMap() {
    this.inventoryService.getInventorySupplierApi().subscribe((data) => {
      this.supplierId$ = data;
      for (let i = 0; i < data.length; i++) {
        this.invSupplierMap.set(
          this.supplierId$[i].id,
          this.supplierId$[i].name
        );
      }
    });
  }

  modalAdd() {
    this.inventories = {
      id: 0,
      name: null,
      quantity: 0,
      employeeId: null,
      expireDate: null,
      date: null,
      inventorySupplyId: null,
      descrption: null,
    };
    this.modalTitle = 'Add Inventory';
    this.activateInventoryComponent = true;
  }

  modalEdit(item: any) {
    this.inventories = item;
    this.modalTitle = 'Edit Inventory';
    this.activateInventoryComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete inventory ${item.id}`)) {
      this.inventoryService.deleteInventoryApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: item.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getInventories();
      });
    }
  }
  modalClose() {
    this.activateInventoryComponent = false;
    this.getInventories();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getInventories();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getInventories();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.inventoryList$.filter((res: any) => {
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
    let element = document.getElementById('inventory-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
