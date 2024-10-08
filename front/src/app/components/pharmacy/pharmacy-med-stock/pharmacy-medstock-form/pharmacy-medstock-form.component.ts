import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-pharmacy-medstock-form',
  templateUrl: './pharmacy-medstock-form.component.html',
  styleUrls: ['./pharmacy-medstock-form.component.css'],
})
export class PharmacyMedstockFormComponent implements OnInit {
  pharmacyMedStock$!: Observable<any[]>;
  medicationId$!: Observable<any[]>;
  employeeId$!: any;
  supplierId$!: Observable<any[]>;

  constructor(
    private pharmacyMedStockService: PharmacyService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() pharmacyMedStock: any;
  id: number = 0;
  medicationId: number = 0;
  employeeId: number = 0;
  quantity: number = 0;
  price: number = 0;
  medSupplierId: number = 0;
  batchNumber: string = '';
  name: string = '';
  expirationDate: string = '';
  timeStamp: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.pharmacyMedStock.id;
    this.medicationId = this.pharmacyMedStock.medicationId;
    this.employeeId = this.pharmacyMedStock.employeeId;
    this.quantity = this.pharmacyMedStock.quantity;
    this.price = this.pharmacyMedStock.price;
    this.medSupplierId = this.pharmacyMedStock.medSupplierId;
    this.batchNumber = this.pharmacyMedStock.batchNumber;
    this.expirationDate = this.pharmacyMedStock.expirationDate;
    this.timeStamp = this.pharmacyMedStock.timeStamp;
    this.name = this.pharmacyMedStock.name;
    this.description = this.pharmacyMedStock.description;
    this.pharmacyMedStock$ =
      this.pharmacyMedStockService.getPharmacyMedStockApi();
    this.medicationId$ = this.pharmacyMedStockService.getMedicationApi();
    this.supplierId$ = this.pharmacyMedStockService.getMedSupplierApi();
    this.getEmployee();
  }
  getEmployee() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeId$ = res.filter(
        (employee: { employeeRoleId: number }) => employee.employeeRoleId == 4
      );
    });
  }

  addPharmacyMedStock() {
    var pharmacyMedStock = {
      medicationId: +this.medicationId,
      employeeId: +this.employeeId,
      quantity: +this.quantity,
      price: +this.price,
      medSupplierId: +this.medSupplierId,
      batchNumber: this.batchNumber,
      name: this.name,
      expirationDate: this.expirationDate,
      timeStamp: this.timeStamp,
      description: this.description,
    };
    console.log(pharmacyMedStock);
    this.pharmacyMedStockService
      .addPharmacyMedStockApi(pharmacyMedStock)
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
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
  updatePharmacyMedStock() {
    var pharmacyMedStock = {
      id: this.id,
      medicationId: +this.medicationId,
      employeeId: +this.employeeId,
      quantity: +this.quantity,
      price: +this.price,
      medSupplierId: +this.medSupplierId,
      batchNumber: this.batchNumber,
      name: this.name,
      expirationDate: this.expirationDate,
      timeStamp: this.timeStamp,
      description: this.description,
    };
    var id: number = this.id;
    console.log(pharmacyMedStock);

    this.pharmacyMedStockService
      .updatePharmacyMedStockApi(id, pharmacyMedStock)
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
