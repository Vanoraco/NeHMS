import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeRoleService } from 'src/app/services/employee-role.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-bill-schedule',
  templateUrl: './bill-schedule.component.html',
  styleUrls: ['./bill-schedule.component.css'],
})
export class BillScheduleComponent implements OnInit {
  billSchedulesList$: any = [];
  patientScheduleList$: any;
  serviceChargeList$: any;
  employeeList$: any;

  modalTitle: string = '';
  activateBillSchedulesComponent: boolean = false;
  billSchedulesList: any;

  serviceChargeMap: Map<number, string> = new Map();
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'bill-schedule-report.xlsx';
  constructor(
    private billSchedulesService: BillingService,
    public empRoleService: EmployeeRoleService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getServiceChargeMap();
    this.getBillSchedule();
    this.empRoleService.getRole();
  }

  getBillSchedule() {
    this.billSchedulesService.getBillScheduleApi().subscribe((response) => {
      this.billSchedulesList$ = response;
    });
  }

  getServiceChargeMap() {
    this.billSchedulesService.getServiceChargeApi().subscribe((res) => {
      this.serviceChargeList$ = res;
      for (let i = 0; i < res.length; i++) {
        this.serviceChargeMap.set(
          this.serviceChargeList$[i].id,
          this.serviceChargeList$[i].name +
            ` : ETB${this.serviceChargeList$[i].price}`
        );
      }
    });
  }

  modalPrint(item: any) {
    this.billSchedulesList = item;
    this.modalTitle = 'Print Bill Schedule';
    this.activateBillSchedulesComponent = true;
  }

  modalAdd() {
    this.billSchedulesList = {
      id: 0,
      serviceChargeId: null,
      patientScheduleId: null,
      employeeId: null,
      date: null,
    };
    this.modalTitle = 'Add Bill Schedules List';
    this.activateBillSchedulesComponent = true;
  }

  modalEdit(item: any) {
    this.billSchedulesList = item;
    this.modalTitle = 'Edit Bill Schedules List';
    this.activateBillSchedulesComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete Bill Schedules List ${item.id}`)
    ) {
      this.billSchedulesService
        .deleteBillScheduleApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getBillSchedule();
        });
    }
  }

  modalClose() {
    this.activateBillSchedulesComponent = false;
    //
    this.getBillSchedule();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getBillSchedule();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getBillSchedule();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.billSchedulesList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.billSchedulesList.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[key] < b[key]) {
          return -1 * direction;
        } else if (a[key] < b[key]) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    );
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('bill-sch-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
