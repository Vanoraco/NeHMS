import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { SettingService } from 'src/app/services/setting.service';
@Component({
  selector: 'app-add-edit-medical-department',
  templateUrl: './add-edit-medical-department.component.html',
  styleUrls: ['./add-edit-medical-department.component.css'],
})
export class AddEditMedicalDepartmentComponent implements OnInit {
  medicalDepartmentList$!: Observable<any[]>;
  constructor(
    private medicalDepartmentService: SettingService,
    private toast: NgToastService
  ) {}
  @Input() medicalDepartmentList: any;
  id: number = 0;
  name: string = '';
  description: string = '';
  ngOnInit(): void {
    this.medicalDepartmentList$ =
      this.medicalDepartmentService.getMedicalDepartmentApi();
    this.id = this.medicalDepartmentList.id;
    this.name = this.medicalDepartmentList.name;
    this.description = this.medicalDepartmentList.description;
  }
  addMedicalDepartment() {
    var medicalDepartmentList = {
      name: this.name,
      description: this.description,
    };
    console.log(medicalDepartmentList);
    this.medicalDepartmentService
      .addMedicalDepartmentApi(medicalDepartmentList)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.medicalDepartmentList$ =
          this.medicalDepartmentService.getMedicalDepartmentApi();
      });
  }
  updateMedicalDepartment() {
    var medicaldepartment = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.medicalDepartmentService
      .updateMedicalDepartmentApi(id, medicaldepartment)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.medicalDepartmentList$ =
          this.medicalDepartmentService.getMedicalDepartmentApi();
      });
  }
}
