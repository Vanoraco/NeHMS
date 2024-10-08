import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css'],
})
export class HolidayComponent implements OnInit {
  holidayList$: any = [];
  employeeID$: any;
  employeeNameMap: Map<number, string> = new Map();
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  id: any;
  constructor(
    private holidayService: UtilityService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];
    this.holidayList$ = this.holidayService.getHolidayApi();
    this.getEmployeeNameMap();
    this.getHoliday();
  }

  modalTitle: string = '';
  activateHolidayComponent: boolean = false;
  holidayList: any;

  getHoliday() {
    this.holidayService.getHolidayApi().subscribe((response) => {
      this.holidayList$ = response.filter(
        (employeeHolidays: { employeeId: number }) =>
          employeeHolidays.employeeId == this.id
      );
    });
  }
  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.employeeNameMap.set(
          this.employeeID$[i].id,
          this.employeeID$[i].firstName +
            ' ' +
            this.employeeID$[i].lastName +
            ` (${this.employeeID$[i].id})`
        );
      }
    });
  }
  modalAdd() {
    this.holidayList = {
      id: 0,
      startDate: null,
      endDate: null,
      employeeId: null,
    };
    this.modalTitle = 'Add Holidays';
    this.activateHolidayComponent = true;
  }

  modalEdit(item: any) {
    this.holidayList = item;
    this.modalTitle = 'Edit Holidays';
    this.activateHolidayComponent = true;
  }
  delete(item: any) {
    if (confirm(`Are you sure you want to delete holiday ${item.id}`)) {
      this.holidayService.deleteHolidayApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('holiday-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getHoliday();
      });
    }
  }
  modalClose() {
    this.activateHolidayComponent = false;
    this.getHoliday();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getHoliday();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getHoliday();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.holidayList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.holidayList.sort(
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
}
