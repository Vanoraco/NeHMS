import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.css'],
})
export class OvertimeComponent implements OnInit {
  overtimeList$: any;

  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];
  employeeList$: any;
  employeeNameMap: Map<number, string> = new Map();
  EmployeeId: any;
  constructor(
    private overtimeService: UtilityService,
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.EmployeeId = this.route.snapshot.params['employeeId'];
    this.getOvertime();
    this.getEmployeeNameMap();
  }
  modalTitle: string = '';
  activateovertimeComponent: boolean = false;
  overtimeList: any;
  getOvertime() {
    this.overtimeService.getOvertimeApi().subscribe((response) => {
      this.overtimeList$ = response.filter(
        (overtimeList: { employeeId: number }) =>
          overtimeList.employeeId == this.EmployeeId
      );
    });
  }
  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeList$ = res;
      for (let i = 0; i < res.length; i++) {
        this.employeeNameMap.set(
          this.employeeList$[i].id,
          this.employeeList$[i].firstName +
            ' ' +
            this.employeeList$[i].lastName +
            ` (${this.employeeList$[i].id})`
        );
      }
    });
  }
  modalAdd() {
    this.overtimeList = {
      id: 0,
      date: null,
      hours: null,
      fixedAmount: null,
      employeeId: null,
    };
    this.modalTitle = 'Add Overtime';
    this.activateovertimeComponent = true;
  }

  modalEdit(item: any) {
    this.overtimeList = item;
    this.modalTitle = 'Edit Overtime';
    this.activateovertimeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete overtime ${item.id}`)) {
      this.overtimeService.deleteOvertimeApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('overtime-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getOvertime();
      });
    }
  }
  modalClose() {
    this.activateovertimeComponent = false;
    this.getOvertime();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getOvertime();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getOvertime();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.overtimeList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.overtimeList.sort(
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
