import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-edit-death',
  templateUrl: './add-edit-death.component.html',
  styleUrls: ['./add-edit-death.component.css'],
})
export class AddEditDeathComponent implements OnInit {
  deathList$: any;
  getEmployeeList$!: Observable<any[]>;
  getPatientList$!: Observable<any[]>;
  constructor(
    private deathService: PatientService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}
  @Input() deathList: any;
  id: number = 0;
  employeeId: number = 0;
  description: string = '';
  patientId: number = 0;
  date: string = '';
  ngOnInit(): void {
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.getPatientList$ = this.deathService.getPatientApi();
    this.deathList$ = this.deathService.getDeathApi();
    this.id = this.deathList.id;
    this.date = this.deathList.date;
    this.employeeId = this.deathList.employeeId;
    this.patientId = this.deathList.patientId;
    this.description = this.deathList.description;
  }

  addDeath() {
    var deathList = {
      date: this.date,
      employeeId: +this.employeeId,
      patientId: +this.patientId,
      description: this.description,
    };
    console.log(deathList);
    this.deathService.addDeathApi(deathList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.deathList$ = this.deathService.getDeathApi();
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
  updateDeath() {
    var death = {
      id: this.id,
      date: this.date,
      employeeId: +this.employeeId,
      patientId: +this.patientId,
      description: this.description,
    };
    var id: number = this.id;
    this.deathService.updateDeathApi(id, death).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.deathList$ = this.deathService.getDeathApi();
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
}
