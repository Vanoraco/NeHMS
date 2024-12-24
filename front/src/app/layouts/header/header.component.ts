import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EmployeeService } from 'src/app/services/employee.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  id: number;
  employeeList: any = [];
  employee: any = [];
  employeeRole: any = [];
  email: any;

  notificationMessages: any = [];
  messages: any = [];
  notificationMessagesAll: any;
  lang: string = '';
  userRole: string;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    public authService: AuthService,
    public employeeService: EmployeeService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('Role');

    if (storedData) {
      
      this.userRole = storedData;
      this.sidebarToggle()
      console.log(this.userRole) // Assuming 'role' is stored in the patientData object
    }
    
    this.lang = localStorage.getItem('lang') || 'en';
    this.email = this.authService.getEmailFromToken();
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployee(this.employeeList[index].id);
          this.getEmpRole(this.employeeList[index].employeeRoleId);
        }
      }
    });
    this.getNotificationMessage();
    this.getMessages();
  }

  getEmpRole(id: number) {
    this.employeeService.getEmployeeRoleByIdApi(id).subscribe((res) => {
      this.employeeRole = res;
    });
  }

  getEmployee(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
    });
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
  getNotificationMessage() {
    this.employeeService.getNotificationMessageApi().subscribe((res) => {
      this.notificationMessages = res.filter(
        (notification: { status: boolean }) => notification.status == false
      );
    });
  }

  getMessages() {
    this.employeeService.getMessageApi().subscribe((res) => {
      this.messages = res.filter(
        (message: { status: boolean }) => message.status == false
      );
    });
  }

  updateNotificationStatus(item: any) {
    var notificationData = {
      id: item.id,
      employeeId: item.employeeId,
      title: item.title,
      status: true,
      date: item.date,
      description: item.description,
    };
    var id = item.id;
    this.employeeService
      .updateNotificationMessageApi(id, notificationData)
      .subscribe((res) => {
        this.getNotificationMessage();
      });
  }

  public createImgPath = (serverPath: string) => {
    return `http://192.168.0.108:5001/${serverPath}`;
  };

  changeLanguage(lang: any) {
    const selectedLanguage = lang.target.value;
    localStorage.setItem('lang', selectedLanguage);
    this.translateService.use(selectedLanguage);
  }
}
