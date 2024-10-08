import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
})
export class InventoryFormComponent implements OnInit {
  inventoryList$!: Observable<any[]>;
  employeeId$!: Observable<any[]>;
  supplierId$!: Observable<any[]>;

  constructor(
    private inventoryService: ExpenseService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() inventoryList: any;
  id: number = 0;
  employeeId: number = 0;
  quantity: number = 0;
  inventorySupplyId: number = 0;
  name: string = '';
  expireDate: string = '';
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.inventoryList.id;
    this.employeeId = this.inventoryList.employeeId;
    this.quantity = this.inventoryList.quantity;
    this.inventorySupplyId = this.inventoryList.inventorySupplyId;
    this.expireDate = this.inventoryList.expireDate;
    this.date = this.inventoryList.date;
    this.name = this.inventoryList.name;
    this.description = this.inventoryList.description;
    this.inventoryList$ = this.inventoryService.getInventoryApi();
    this.supplierId$ = this.inventoryService.getInventorySupplierApi();
    this.employeeId$ = this.employeeService.getEmployeeApi();
  }

  addInventory() {
    var inventories = {
      employeeId: +this.employeeId,
      quantity: +this.quantity,
      inventorySupplyId: +this.inventorySupplyId,
      name: this.name,
      expireDate: this.expireDate,
      date: this.date,
      description: this.description,
    };
    console.log(inventories);
    this.inventoryService.addInventoryApi(inventories).subscribe(
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
  updateInventory() {
    var inventories = {
      id: this.id,
      employeeId: +this.employeeId,
      quantity: +this.quantity,
      inventorySupplyId: +this.inventorySupplyId,
      name: this.name,
      expireDate: this.expireDate,
      date: this.date,
      description: this.description,
    };
    var id: number = this.id;
    console.log(inventories);

    this.inventoryService.updateInventoryApi(id, inventories).subscribe(
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
