import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-medicine-stock-hospital',
  templateUrl: './medicine-stock-hospital.component.html',
  styleUrls: ['./medicine-stock-hospital.component.css'],
})
export class MedicineStockHospitalComponent implements OnInit {
  medStockHospitalList$: any;
  employeeId$: any;
  supplierId$: any;

  //Map to display data associate with foreign keys
  employeeMap: Map<number, string> = new Map();
  medSupplierMap: Map<number, string> = new Map();
  // Variables (properties)
  modalTitle: string = '';
  activateMedicineStockHospitalComponent: boolean = false;
  MedicineStockHospitals: any;
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
  fileName = 'medical-stock-hospital.xlsx';
  constructor(
    private medStockService: PharmacyService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getMedicineStockHospital();
    this.getEmployeeMap();
    this.getMedSupplierMap();
  }

  getMedicineStockHospital() {
    this.medStockService.getMedicineStockHospitalApi().subscribe((res) => {
      this.medStockHospitalList$ = res;
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

  modalAdd() {
    this.MedicineStockHospitals = {
      id: 0,
      quantity: 0,
      employeeId: null,
      medicationId: null,
      batchNumber: null,
      expirationDate: null,
      timeSatamp: null,
      medSupplierId: null,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Medicine Stock Hospital';
    this.activateMedicineStockHospitalComponent = true;
  }

  modalEdit(item: any) {
    this.MedicineStockHospitals = item;
    this.modalTitle = 'Edit Medicine Stock Hospital';
    this.activateMedicineStockHospitalComponent = true;
  }

  delete(item: any) {
    if (
      confirm(
        `Are you sure you want to delete Medicine Stock Hospital ${item.id}`
      )
    ) {
      this.medStockService
        .deleteMedicineStockHospitalApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'Success',
            summary: item.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getMedicineStockHospital();
        });
    }
  }

  modalClose() {
    this.activateMedicineStockHospitalComponent = false;
    this.getMedicineStockHospital();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getMedicineStockHospital();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getMedicineStockHospital();
  }
  
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.medStockHospitalList$.filter((res: any) => {
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
    let element = document.getElementById('med-stock-hospital-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
