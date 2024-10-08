import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-medicine-categories',
  templateUrl: './medicine-categories.component.html',
  styleUrls: ['./medicine-categories.component.css'],
})
export class MedicineCategoriesComponent implements OnInit {
  medicineCategoryList$!: Observable<any[]>;

  // Map to display data associate with foreign keys

  constructor(
    private medicineCategoryService: PharmacyService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.medicineCategoryList$ =
      this.medicineCategoryService.getMedicineCategoryApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateMedicineCategoryComponent: boolean = false;
  medicineCategoryList: any;

  modalAdd() {
    this.medicineCategoryList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add Medicine Category';
    this.activateMedicineCategoryComponent = true;
  }

  modalEdit(item: any) {
    this.medicineCategoryList = item;
    this.modalTitle = 'Edit Medicine Category';
    this.activateMedicineCategoryComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete medicine category ${item.id}`)
    ) {
      this.medicineCategoryService
        .deleteMedicineCategoryApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'Success',
            summary: item.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          var showDeleteSuccess = document.getElementById(
            'delete-success-alert'
          );
          if (showDeleteSuccess) {
            showDeleteSuccess.style.display = 'block';
          }
          setTimeout(function () {
            if (showDeleteSuccess) {
              showDeleteSuccess.style.display = 'none';
            }
          }, 4000);
          this.medicineCategoryList$ =
            this.medicineCategoryService.getMedicineCategoryApi();
        });
    }
  }
  modalClose() {
    this.activateMedicineCategoryComponent = false;
    this.medicineCategoryList$ =
      this.medicineCategoryService.getMedicineCategoryApi();
  }
}
