import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css'],
})
export class VaccineFormComponent implements OnInit {
  // vaccineLsit: any;
  constructor(
    private VaccineService: PharmacyService,
    private toast: NgToastService
  ) {}

  @Input() VaccineList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.VaccineList.id;
    this.name = this.VaccineList.name;
    this.description = this.VaccineList.description;
  }

  addVaccine() {
    var VaccineList = {
      name: this.name,
      description: this.description,
    };
    console.log(VaccineList);
    this.VaccineService.addVaccineApi(VaccineList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name+ ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.VaccineService.getVaccineApi()
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
  updateVaccine() {
    var VaccineList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(VaccineList);

    this.VaccineService.updateVaccineApi(id, VaccineList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.VaccineService.getVaccineApi()
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
