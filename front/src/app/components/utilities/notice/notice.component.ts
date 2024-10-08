import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent implements OnInit {
  noticeList$!: Observable<any[]>;

  // Variables (properties)
  modalTitle: string = '';
  activateAddEditNoticeComponent: boolean = false;
  notice: any;

  id: number;
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  // Map to display data associate with foreign keys

  constructor(
    private service: UtilityService,
    private empService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.noticeList$ = this.service.getNoticeApi();

    this.email = this.authService.getEmailFromToken();
    this.empService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.empService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
      this.getEmployeeRole(this.employee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.empService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.employeeRole = data;
    });
  }

  modalAdd() {
    this.notice = {
      id: 0,
      name: null,
      description: null,
      noticeBoard: null,
      date: null,
    };
    this.modalTitle = 'Add Notice';
    this.activateAddEditNoticeComponent = true;
  }

  modalEdit(item: any) {
    this.notice = item;
    this.modalTitle = 'Edit Notice';
    this.activateAddEditNoticeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Notice ${item.id}`)) {
      this.service.deleteNoticeApi(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('notice-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.noticeList$ = this.service.getNoticeApi();
      });
    }
  }

  modalClose() {
    this.activateAddEditNoticeComponent = false;
    this.noticeList$ = this.service.getNoticeApi();
  }
}
