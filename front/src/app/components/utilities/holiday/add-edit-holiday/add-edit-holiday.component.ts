import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';
@Component({
  selector: 'app-add-edit-holiday',
  templateUrl: './add-edit-holiday.component.html',
  styleUrls: ['./add-edit-holiday.component.css'],
})
export class AddEditHolidayComponent implements OnInit {
  holidayList$!: Observable<any[]>;
  getEmployeeList$!: Observable<any[]>;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private holidayService: UtilityService
  ) {}

  @Input() holidayList: any;
  id: number = 0;
  employeeId: number = 0;
  startDate: number = 0;
  endDate: number = 0;

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['employeeId'];
    this.id = this.holidayList.id;
    this.startDate = this.holidayList.startDate;
    this.endDate = this.holidayList.endDate;

    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.holidayList$ = this.holidayService.getHolidayApi();
  }

  addHoliday() {
    var holidayList = {
      employeeId: +this.employeeId,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    console.log(holidayList);
    this.holidayService.addHolidayApi(holidayList).subscribe((res) => {
      var closeModalBtn = document.getElementById('holiday-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.holidayList$ = this.holidayService.getHolidayApi();
    });
  }
  updateHoliday() {
    var holiday = {
      id: this.id,
      employeeId: +this.employeeId,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    var id: number = this.id;
    this.holidayService.updateHolidayApi(id, holiday).subscribe((res) => {
      var closeModalBtn = document.getElementById('holiday-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.holidayList$ = this.holidayService.getHolidayApi();
    });
  }
}
