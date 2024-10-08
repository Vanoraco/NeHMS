import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-employe-salary',
  templateUrl: './employe-salary.component.html',
  styleUrls: ['./employe-salary.component.css'],
})
export class EmployeSalaryComponent implements OnInit {
  employeeSalaryList$: any;
  employeeList$: any;
  employeeID$: any;
  employeeNameMap: Map<number, string> = new Map();
  searchName: string = '';
  id: number = 0;
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['employeeId'];
    this.employeeList$ = this.employeeService.getEmployeeApi();
    this.getEmployeeNameMap();
    this.getEmployeeSalary();
  }

  getEmployeeSalary() {
    this.employeeService.getEmployeeSalaryApi().subscribe((response) => {
      this.employeeSalaryList$ = response.filter(
        (employeeSalary: { employeeId: number }) =>
          employeeSalary.employeeId == this.id
      );
    });
  }
  modalTitle: string = '';
  activateEmployeeSalaryComponent: boolean = false;
  employeeSalaryList: any;

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
    this.employeeSalaryList = {
      id: 0,
      employeeId: null,
      salary: 0,
    };
    this.modalTitle = 'Add';
    this.activateEmployeeSalaryComponent = true;
  }

  modalEdit(item: any) {
    this.employeeSalaryList = item;
    this.modalTitle = 'Edit';
    this.activateEmployeeSalaryComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete salary ${item.id}`)) {
      this.employeeService.deleteEmployeeSalaryApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getEmployeeSalary();
      });
    }
  }
  modalClose() {
    this.activateEmployeeSalaryComponent = false;
    //
    this.getEmployeeSalary();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getEmployeeSalary();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getEmployeeSalary();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.employeeSalaryList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.employeeSalaryList.sort(
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
