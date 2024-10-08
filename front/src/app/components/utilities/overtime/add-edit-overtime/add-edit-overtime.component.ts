import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-add-edit-overtime',
  templateUrl: './add-edit-overtime.component.html',
  styleUrls: ['./add-edit-overtime.component.css'],
})
export class AddEditOvertimeComponent implements OnInit {
  overtimeList$!: Observable<any[]>;
  employeeList$: any = [];
  EmployeeId: any;
  constructor(
    private overtimeService: UtilityService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}
  @Input() overtimeList: any;
  id: number = 0;
  date: string = '';
  hours: number = 0;
  fixedAmount: number = 0;
  ngOnInit(): void {
    this.EmployeeId = this.route.snapshot.params['employeeId'];
    this.employeeService
      .getEmployeeByIdApi(this.EmployeeId)
      .subscribe((res) => {
        this.employeeList$ = res;
      });

    this.id = this.overtimeList.id;
    this.date = this.overtimeList.date;
    this.hours = +this.overtimeList.hours;
    this.fixedAmount = +this.overtimeList.fixedAmount;

    this.overtimeList$ = this.overtimeService.getOvertimeApi();
  }
  addOvertime() {
    var overtimeList = {
      date: this.date,
      employeeId: +this.employeeList$.id,
      hours: +this.hours,
      fixedAmount: +this.fixedAmount,
    };
    console.log(overtimeList);
    this.overtimeService.addOvertimeApi(overtimeList).subscribe((res) => {
      var closeModalBtn = document.getElementById('overtime-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }
  updateOvertime() {
    var overtime = {
      id: this.id,
      date: this.date,
      employeeId: +this.employeeList$.id,
      hours: +this.hours,
      fixedAmount: +this.fixedAmount,
    };
    var id: number = this.id;
    this.overtimeService.updateOvertimeApi(id, overtime).subscribe((res) => {
      var closeModalBtn = document.getElementById('overtime-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }
}
