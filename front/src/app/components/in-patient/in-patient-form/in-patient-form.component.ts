import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'in-patient-form',
  templateUrl: './in-patient-form.component.html',
  styleUrls: ['./in-patient-form.component.css'],
})
export class InPatientFormComponent implements OnInit {
  ipdList$!: Observable<any[]>;
  // ipdCategoryId$!: Observable<any[]>;

  constructor(
    private ipdService: PatientService,
    private toast: NgToastService
  ) {}

  @Input() ipdListForm: any;
  id: number = 0;
  ipdCatagoryId: number = 0;
  amount: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.ipdListForm.id;
    this.ipdCatagoryId = this.ipdListForm.ipdCatagoryId;
    this.amount = this.ipdListForm.amount;
    this.name = this.ipdListForm.name;
    this.description = this.ipdListForm.description;

    this.ipdList$ = this.ipdService.getPatientApi();
    // this.ipdCategoryId$ = this.ipdService.getipdCategoryApi();
  }

  addIpd() {
    var ipdList = {
      ipdCatagoryId: +this.ipdCatagoryId,
      amount: +this.amount,
      name: this.name,
      description: this.description,
    };
    console.log(ipdList);
    this.ipdService.addPatientApi(ipdList).subscribe(
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
        this.ipdList$ = this.ipdService.getPatientApi();
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
  updateIpd() {
    var ipdList = {
      id: this.id,
      ipdCatagoryId: +this.ipdCatagoryId,
      amount: +this.amount,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.ipdService.updatePatientApi(id, ipdList).subscribe(
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
        this.ipdList$ = this.ipdService.getPatientApi();
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
