import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-add-edit-employee-salary',
  templateUrl: './add-edit-employee-salary.component.html',
  styleUrls: ['./add-edit-employee-salary.component.css'],
})
export class AddEditEmployeeSalaryComponent implements OnInit {
  getEmployeeList$!: Observable<any[]>;
  employeeSalaryList$!: Observable<any[]>;
  employeeList$!: Observable<any[]>;
  employeeId: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  @Input() employeeSalaryList: any;
  id: number = 0;
  salary: number = 0;
  ngOnInit(): void {
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.id = this.employeeSalaryList.id;
    this.salary = this.employeeSalaryList.salary;

    this.employeeId = this.route.snapshot.params['employeeId'];
  }

  addEmployeeSalary() {
    var employeeSalaryList = {
      salary: this.salary,
      employeeId: +this.employeeId,
    };
    console.log(employeeSalaryList);
    this.employeeService
      .addEmployeeSalaryApi(employeeSalaryList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
  }

  updateEmployeeSalary() {
    var employeeSalary = {
      id: this.id,
      salary: this.salary,
      employeeId: +this.employeeId,
    };
    var id: number = this.id;
    this.employeeService
      .updateEmployeeSalaryApi(id, employeeSalary)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
  }
}
