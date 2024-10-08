import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointmentDurationList$: any = [];

  // Variables (properties)
  modalTitle: string = '';
  activateAppointmentDurationComponent: boolean = false;
  appointmentDurations: any;
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
  fileName = 'appointment.xlsx';
  // Map to display data associate with foreign keys
  constructor(
    private appointmentDurationService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAppointmentDuration();
  }

  getAppointmentDuration() {
    this.appointmentDurationService.getAppointmentDurationApi().subscribe((response) => {
      this.appointmentDurationList$ = response;
    });
  }

  modalAdd() {
    this.appointmentDurations = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Appointment Duration';
    this.activateAppointmentDurationComponent = true;
  }

  modalEdit(item: any) {
    this.appointmentDurations = item;
    this.modalTitle = 'Edit Appointment Duration';
    this.activateAppointmentDurationComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Appointment Duration ${item.id}`)) {
      this.appointmentDurationService.deleteAppointmentDurationApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: item.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAppointmentDuration();
      });
    }
  }
  modalClose() {
    this.activateAppointmentDurationComponent = false;
    this.getAppointmentDuration();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getAppointmentDuration();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAppointmentDuration();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.appointmentDurationList$.filter((res: any) => {
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
    let element = document.getElementById('appointment-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
