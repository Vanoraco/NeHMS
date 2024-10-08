import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css'],
})
export class AppointmentFormComponent implements OnInit {
  constructor(
    private AppointmentService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() AppointmentDurationList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.AppointmentDurationList.id;
    this.name = this.AppointmentDurationList.name;
    this.description = this.AppointmentDurationList.description;
  }

  saveAppointmentDuration() {
    if (this.id != 0) {
      this.updateAppointmentDuration();
    } else {
      this.addAppointmentDuration();
    }
  }
  addAppointmentDuration() {
    var AppointmentDurationList = {
      name: this.name,
      description: this.description,
    };
    console.log(AppointmentDurationList);
    this.AppointmentService.addAppointmentDurationApi(
      AppointmentDurationList
    ).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
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
  updateAppointmentDuration() {
    var AppointmentDurationList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(AppointmentDurationList);

    this.AppointmentService.updateAppointmentDurationApi(
      id,
      AppointmentDurationList
    ).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
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
