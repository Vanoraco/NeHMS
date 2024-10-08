import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  modalShowTitle: string = '';
  activateShowNotificationComponent: boolean = false;
  returnUrl() {
    throw new Error('Method not implemented.');
  }
  notificationList$: any = [];
  patientList$: any = [];
  employeeList$: any = [];

  // Variables (properties)
  modalTitle: string = '';
  activateNotificationComponent: boolean = false;
  notificationList: any;
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

  // Map to display data associate with foreign keys
  employeeMap: Map<number, string> = new Map();
  PatientId: any;

  constructor(
    private notificationService: EmployeeService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.PatientId = this.route.snapshot.params['patientId'];
    this.getNotificationList();
    this.getEmployeeMap();
  }

  getEmployeeMap() {
    this.notificationService.getEmployeeApi().subscribe((data) => {
      this.employeeList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeList$[i].id,
          this.employeeList$[i].firstName + ' ' + this.employeeList$[i].lastName
        );
      }
    });
  }

  getNotificationList() {
    this.notificationService
      .getNotificationMessageApi()
      .subscribe((response) => {
        this.notificationList$ = response;
        // .filter(
        //   (patientnotification: { patientId: number }) =>
        //     patientnotification.patientId == this.PatientId
        // );
        // console.log(this.notificationList$);
      });
  }

  modalAdd() {
    this.notificationList = {
      id: 0,
      date: null,
      title: null,
      employeeId: null,
      status: null,
      description: null,
    };
    this.modalTitle = 'Add notification';
    this.activateNotificationComponent = true;
  }

  modalEdit(item: any) {
    this.notificationList = item;
    this.modalTitle = 'Edit notification';
    this.activateNotificationComponent = true;
  }
  modalShow(item: any) {
    this.notificationList = item;
    this.modalShowTitle = 'Show notification';
    this.activateShowNotificationComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete notification ${item.id}`)) {
      this.notificationService
        .deleteNotificationMessageApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Deleted!',
            duration: 4000,
          });
          this.getNotificationList();
        });
    }
  }

  modalClose() {
    this.activateNotificationComponent = false;
    this.getNotificationList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getNotificationList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getNotificationList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.notificationList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowernotification()
          .match(res.searchName.toLocaleLowernotification());
      });
    }
  }

  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
}
