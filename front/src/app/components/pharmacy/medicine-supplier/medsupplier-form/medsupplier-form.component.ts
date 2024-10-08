import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-medsupplier-form',
  templateUrl: './medsupplier-form.component.html',
  styleUrls: ['./medsupplier-form.component.css'],
})
export class MedsupplierFormComponent implements OnInit {
  medSupplierList$!: Observable<any[]>;

  constructor(
    private medSupplierService: PharmacyService,
    private toast: NgToastService
  ) {}

  @Input() medicineSupplierList: any;
  id: number = 0;
  name: string = '';
  address: string = '';
  phoneNumber: number = 0;
  description: string = '';
  ngOnInit(): void {
    this.id = this.medicineSupplierList.id;
    this.name = this.medicineSupplierList.name;
    this.address = this.medicineSupplierList.address;
    this.phoneNumber = this.medicineSupplierList.phoneNumber;
    this.description = this.medicineSupplierList.description;
  }
  addMedSupplier() {
    var medicineSupplierList = {
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      description: this.description,
    };
    console.log(medicineSupplierList);
    this.medSupplierService.addMedSupplierApi(medicineSupplierList).subscribe(
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
  updateMedSupplier() {
    var medicineSupplierList = {
      id: this.id,
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      description: this.description,
    };
    var id: number = this.id;
    this.medSupplierService
      .updateMedSupplierApi(id, medicineSupplierList)
      .subscribe(
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

          var showUpdateSuccess = document.getElementById(
            'update-success-alert'
          );
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
