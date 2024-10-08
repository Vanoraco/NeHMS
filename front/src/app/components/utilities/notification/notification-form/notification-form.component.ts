import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.css'],
})
export class NotificationFormComponent implements OnInit {
  admissionList: any = [];
  notificationList$: any = [];
  admissionId: number = 0;

    // Variables (properties)
    employeeList: any;
    employee: any = [];
    employeeRole: any = [];
    email: any;

  constructor(
    private notificationService: EmployeeService,
    private route: ActivatedRoute,
    private admissionService: AdmissionService,
    private authService: AuthService,
    private toast: NgToastService
  ) {}

  @Input() notificationList: any;
  id: number = 0;
  employeeId: number = 0;
  date: string = '';
  status: string = '';
  title: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.notificationList.id;
    this.employeeId = this.notificationList.employeeId;
    this.date = this.notificationList.date;
    this.status = this.notificationList.status;
    this.title = this.notificationList.title;
    this.description = this.notificationList.description;

    this.admissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.admissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
    this.getNotification();
    this.email = this.authService.getEmailFromToken();
    this.notificationService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }

  getEmployeeById(id: string | number) {
    this.notificationService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
    });
  }

  getNotification() {
    this.notificationService.getNotificationMessageApi().subscribe((res) => {
      this.notificationList$ = res;
    });
  }

  addNotification() {
    var notificationList = {
      employeeId: this.employee.id,
      date: this.date,
      status: this.status == 'true' ? true : false,
      title: this.title,
      description: this.description,
    };
    console.log(notificationList);
    this.notificationService
      .addNotificationMessageApi(notificationList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.title + ' Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById(
            'notification-modal-close'
          );
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getNotification();
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
  updateNotification() {
    var notificationList = {
      id: this.id,
      employeeId: this.employee.id,
      date: this.date,
      status: this.status == 'true' ? true : false,
      title: this.title,
      description: this.description,
    };
    var id: number = this.id;
    console.log(notificationList);

    this.notificationService
      .updateNotificationMessageApi(id, notificationList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.title + ' Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById(
            'notification-modal-close'
          );
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getNotification();
        },
        (err) => {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
}
