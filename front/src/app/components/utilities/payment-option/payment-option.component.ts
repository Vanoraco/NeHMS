import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
import Swal from 'sweetalert2';
import { AddEditOperations, PaymentOption } from './add-edit-operations';

@Component({
  selector: 'app-payment-option',
  templateUrl: './payment-option.component.html',
  styleUrls: ['./payment-option.component.css'],
})
export class PaymentOptionComponent implements OnInit {
  paymentOptionList: PaymentOption[] = [];

  addForm: FormGroup;
  submitted: boolean = false;
  buttonText: string;
  addEditOperations: AddEditOperations;

  //search
  searchName: string;
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];

  constructor(
    private paymentOptionService: SettingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getPaymentOptions();
    this.setupFormGroups();
  }

  setupFormGroups() {
    this.buttonText = 'Save';
    this.addEditOperations = AddEditOperations.add;
    this.addForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.pattern('[a-zA-Z ]*'),
        ])
      ),
      description: new FormControl('', Validators.required),
    });
  }

  getPaymentOptions() {
    this.paymentOptionService
      .getPaymentOptionApi()
      .subscribe((response: PaymentOption[]) => {
        this.paymentOptionList = response;
      });
  }

  get controls() {
    return this.addForm.controls;
  }
  addPaymentOption() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    switch (this.addEditOperations) {
      case AddEditOperations.add:
        this.paymentOptionService
          .addPaymentOptionApi(this.addForm.value)
          .subscribe(
            (res) => {
              this.toast.success({
                detail: 'SUCCESS',
                summary: this.addForm.value.name + ' Sucessfully Added',
                duration: 4000,
              });
              this.resetForm();
              this.getPaymentOptions();
            },
            (err) => {
              this.toast.error({
                detail: 'ERROR',
                summary: 'Something went wrong',
                duration: 4000,
              });
            }
          );
        break;
      case AddEditOperations.update:
        this.paymentOptionService
          .updatePaymentOptionApi(this.addForm.value)
          .subscribe(
            (res) => {
              this.toast.success({
                detail: 'SUCCESS',
                summary: this.addForm.value.name + ' Sucessfully Updated',
                duration: 4000,
              });
              this.resetForm();
              this.getPaymentOptions();
            },
            (err) => {
              this.toast.error({
                detail: 'ERROR',
                summary: 'Something went wrong',
                duration: 4000,
              });
            }
          );
        break;
    }
  }
  updatePaymentOption(id: number) {
    this.buttonText = 'Update';
    this.addEditOperations = AddEditOperations.update;
    this.paymentOptionService.getPaymentOptionIdApi(id).subscribe((res) => {
      let pod = res;
      this.addForm.patchValue(pod);
    });
  }
  deletePaymentOption(id: number) {
    Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentOptionService
          .deletePaymentOptionApi(id)
          .subscribe((res) => {
            this.toast.success({
              detail: 'SUCCESS',
              summary: 'Sucessfully Deleted',
              duration: 4000,
            });
            this.getPaymentOptions();
          });
      }
    });
  }

  resetForm() {
    this.submitted = false;
    this.addForm.reset();
    this.buttonText = 'Save';
    this.addEditOperations = AddEditOperations.add;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPaymentOptions();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPaymentOptions();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.paymentOptionList.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    key = this.key;
    this.reverse = this.reverse;
  }
}
