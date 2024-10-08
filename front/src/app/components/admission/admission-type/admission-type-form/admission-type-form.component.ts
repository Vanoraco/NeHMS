import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { AdmissionService } from 'src/app/services/admission.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'admission-type-form',
  templateUrl: './admission-type-form.component.html',
  styleUrls: ['./admission-type-form.component.css'],
})
export class AdmissionTypeFormComponent implements OnInit {
  constructor(
    private AdmissionTypeService: AdmissionService,
    private toast: NgToastService
  ) {}

  @Input() AdmissionTypeList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.AdmissionTypeList.id;
    this.name = this.AdmissionTypeList.name;
    this.description = this.AdmissionTypeList.description;
  }

  addAdmissionType() {
    var AdmissionTypeList = {
      name: this.name,
      description: this.description,
    };
    console.log(AdmissionTypeList);
    this.AdmissionTypeService.addAdmissionTypeApi(AdmissionTypeList).subscribe(
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
  updateAdmissionType() {
    var AdmissionTypeList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(AdmissionTypeList);

    this.AdmissionTypeService.updateAdmissionTypeApi(
      id,
      AdmissionTypeList
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
