import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-inventory-supplier-form',
  templateUrl: './inventory-supplier-form.component.html',
  styleUrls: ['./inventory-supplier-form.component.css'],
})
export class InventorySupplierFormComponent implements OnInit {
  inventorySupplierList$!: Observable<any[]>;

  constructor(
    private invSupplierService: ExpenseService,
    private toast: NgToastService
  ) {}

  @Input() inventorySupplierList: any;
  id: number = 0;
  name: string = '';
  address: string = '';
  phoneNumber: number = 0;
  description: string = '';
  ngOnInit(): void {
    this.id = this.inventorySupplierList.id;
    this.name = this.inventorySupplierList.name;
    this.address = this.inventorySupplierList.address;
    this.phoneNumber = this.inventorySupplierList.phoneNumber;
    this.description = this.inventorySupplierList.description;
  }
  addInvSupplier() {
    var inventorySupplierList = {
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      description: this.description,
    };
    console.log(inventorySupplierList);
    this.invSupplierService
      .addInventorySupplierApi(inventorySupplierList)
      .subscribe(
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
            detail: 'Error',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
  updateInvSupplier() {
    var inventorySupplierList = {
      id: this.id,
      name: this.name,
      address: this.address,
      phoneNumber: this.phoneNumber,
      description: this.description,
    };
    var id: number = this.id;
    this.invSupplierService
      .updateInventorySupplierApi(id, inventorySupplierList)
      .subscribe(
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
            detail: 'Error',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
}
