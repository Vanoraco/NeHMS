import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-specialization-form',
  templateUrl: './specialization-form.component.html',
  styleUrls: ['./specialization-form.component.css'],
})
export class SpecializationFormComponent implements OnInit {
  specializationList$: any;
  constructor(
    private specializationService: SettingService,
    private toast: NgToastService
  ) {}

  @Input() specializationList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.specializationList.id;
    this.name = this.specializationList.name;
    this.description = this.specializationList.description;
    this.specializationList$ =
      this.specializationService.getSpecializationApi();
  }

  addSpecialization() {
    var specializationList = {
      name: this.name,
      description: this.description,
    };
    console.log(specializationList);
    this.specializationService
      .addSpecializationApi(specializationList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.name + ' Sucessfully Added!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
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
  updateSpecialization() {
    var specializationList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(specializationList);

    this.specializationService
      .updateSpecializationApi(id, specializationList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: this.name + ' Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
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
