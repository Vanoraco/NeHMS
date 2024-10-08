import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { LaboratoryService } from 'src/app/services/laboratory.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bill-laboratory',
  templateUrl: './bill-laboratory.component.html',
  styleUrls: ['./bill-laboratory.component.css'],
})
export class BillLaboratoryComponent implements OnInit {
  billLabList$: any = [];
  employeeList$: any;
  labRequestList$: any;
  serviceChargeList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateBillLabComponent: boolean = false;
  billLabList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'bill-lab-report.xlsx';
  // Map to display data associate with foreign keys
  employeeListMap: Map<number, string> = new Map();
  labRequestListMap: Map<number, string> = new Map();
  serviceChargeListMap: Map<number, string> = new Map();

  constructor(
    private billLabService: BillingService,
    private employeeService: EmployeeService,
    private labRequestService: LaboratoryService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getBillLabList();
    this.getEmployeeNameMap();
    this.getServiceChargeListMap();
  }

  getBillLabList() {
    this.billLabService.getBillLabApi().subscribe((response) => {
      this.billLabList$ = response;
    });
  }

  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeListMap.set(
          this.employeeList$[i].id,
          this.employeeList$[i].firstName +
            ' ' +
            this.employeeList$[i].lastName +
            ` (${this.employeeList$[i].id})`
        );
      }
    });
  }

  getServiceChargeListMap() {
    this.employeeService.getServiceChargeApi().subscribe((data) => {
      this.serviceChargeList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.serviceChargeListMap.set(
          this.serviceChargeList$[i].id,
          this.serviceChargeList$[i].name +
            ` : ETB${this.serviceChargeList$[i].price}`
        );
      }
    });
  }

  modalPrint(item: any) {
    this.billLabList = item;
    this.modalTitle = 'Print Bill Schedule';
    this.activateBillLabComponent = true;
  }
  modalAdd() {
    this.billLabList = {
      id: 0,
      labRequestId: null,
      employeeId: null,
      serviceChargeId: null,
      date: null,
      description: null,
    };
    this.modalTitle = 'Add Bill Laboratory';
    this.activateBillLabComponent = true;
  }

  modalEdit(item: any) {
    this.billLabList = item;
    this.modalTitle = 'Edit Bill Laboratory';
    this.activateBillLabComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete bill laboratory  ${item.id}`)
    ) {
      this.billLabService.deleteBillLabApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.billLabList.disease + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getBillLabList();
      });
    }
  }

  modalClose() {
    this.activateBillLabComponent = false;
    this.getBillLabList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getBillLabList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getBillLabList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.billLabList$.filter((res: any) => {
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
    let element = document.getElementById('my-excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
