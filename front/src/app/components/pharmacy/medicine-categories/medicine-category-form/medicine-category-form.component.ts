import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-medicine-category-form',
  templateUrl: './medicine-category-form.component.html',
  styleUrls: ['./medicine-category-form.component.css'],
})
export class MedicineCategoryFormComponent implements OnInit {
  medicineCategoryList$!: Observable<any[]>;

  constructor(
    private medicineCatService: PharmacyService,
    private toast: NgToastService
  ) {}

  @Input() medicineCategory: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.medicineCategory.id;
    this.name = this.medicineCategory.name;
    this.description = this.medicineCategory.description;
    this.medicineCategoryList$ = this.medicineCatService.getMedicineCategoryApi();
  }

  addMedicineCategory() {
    var medicineCategory = {
      name: this.name,
      description: this.description,
    };
    console.log(medicineCategory);
    this.medicineCatService.addMedicineCategoryApi(medicineCategory).subscribe(
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
  updateMedicineCategory() {
    var medicineCategory = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.medicineCatService.updateMedicineCategoryApi(id, medicineCategory).subscribe(
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
