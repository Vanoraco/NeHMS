import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-medication-form',
  templateUrl: './medication-form.component.html',
  styleUrls: ['./medication-form.component.css'],
})
export class MedicationFormComponent implements OnInit {
  medicationList$!: Observable<any[]>;
  medicineCategoryId$!: Observable<any[]>;
  // employeeId$!: Observable<any[]>;

  constructor(
    private medicationService: PharmacyService,
    // private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() medicationList: any;
  id: number = 0;
  medicineCategoryId: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.medicationList.id;
    this.medicineCategoryId = this.medicationList.medicineCategoryId;
    this.name = this.medicationList.name;
    this.description = this.medicationList.description;
    this.medicationList$ = this.medicationService.getMedicationApi();
    this.medicineCategoryId$ = this.medicationService.getMedicineCategoryApi();
    // this.employeeId$ = this.employeeService.getEmployeeApi();
  }

  addMedication() {
    var medicationList = {
      medicineCategoryId: +this.medicineCategoryId,
      name: this.name,
      description: this.description,
    };
    console.log(medicationList);
    this.medicationService.addMedicationApi(medicationList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Success',
          summary: this.name + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        var showAddSuccess = document.getElementById('add-success-alert');
        if (showAddSuccess) {
          showAddSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showAddSuccess) {
            showAddSuccess.style.display = 'none';
          }
        }, 4000);
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
  updateMedication() {
    var medicationList = {
      id: this.id,
      medicineCategoryId: +this.medicineCategoryId,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.medicationService.updateMedicationApi(id, medicationList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Success',
          summary: this.name + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }

        var showUpdateSuccess = document.getElementById('update-success-alert');
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = 'block';
        }
        setTimeout(function () {
          if (showUpdateSuccess) {
            showUpdateSuccess.style.display = 'none';
          }
        }, 4000);
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
