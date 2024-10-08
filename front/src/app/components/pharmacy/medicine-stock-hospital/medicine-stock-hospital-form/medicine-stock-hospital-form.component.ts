import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-medicine-stock-hospital-form',
  templateUrl: './medicine-stock-hospital-form.component.html',
  styleUrls: ['./medicine-stock-hospital-form.component.css'],
})
export class MedicineStockHospitalFormComponent implements OnInit {
  medicationId$!: Observable<any[]>;
  employeeId$!: Observable<any[]>;
  supplierId$!: Observable<any[]>;

  constructor(
    private medStockService: PharmacyService,
    private employeeService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() medStockHospital: any;
  id: number = 0;
  medicationId: number = 0;
  employeeId: number = 0;
  quantity: number = 0;
  medSupplierId: number = 0;
  batchNumber: string = '';
  name: string = '';
  expirationDate: string = '';
  timeSatamp: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.medStockHospital.id;
    this.medicationId = this.medStockHospital.medicationId;
    this.employeeId = this.medStockHospital.employeeId;
    this.quantity = this.medStockHospital.quantity;
    this.medSupplierId = this.medStockHospital.medSupplierId;
    this.batchNumber = this.medStockHospital.batchNumber;
    this.expirationDate = this.medStockHospital.expirationDate;
    this.timeSatamp = this.medStockHospital.timeSatamp;
    this.name = this.medStockHospital.name;
    this.description = this.medStockHospital.description;

    this.medicationId$ = this.medStockService.getMedicationApi();
    this.supplierId$ = this.medStockService.getMedSupplierApi();
    this.employeeId$ = this.employeeService.getEmployeeApi();
  }

  addMedicineStockHospital() {
    var medStockHospital = {
      medicationId: +this.medicationId,
      employeeId: +this.employeeId,
      quantity: +this.quantity,
      medSupplierId: +this.medSupplierId,
      batchNumber: this.batchNumber,
      name: this.name,
      expirationDate: this.expirationDate,
      timeSatamp: this.timeSatamp,
      description: this.description,
    };
    console.log(medStockHospital);
    this.medStockService.addMedicineStockHospitalApi(medStockHospital).subscribe(
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
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updateMedicineStockHospital() {
    var medStockHospital = {
      id: this.id,
      medicationId: +this.medicationId,
      employeeId: +this.employeeId,
      quantity: +this.quantity,
      medSupplierId: +this.medSupplierId,
      batchNumber: this.batchNumber,
      name: this.name,
      expirationDate: this.expirationDate,
      timeSatamp: this.timeSatamp,
      description: this.description,
    };
    var id: number = this.id;
    console.log(medStockHospital);

    this.medStockService
      .updateMedicineStockHospitalApi(id, medStockHospital)
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
            detail: 'ERROR',
            summary: 'Something went wrong!',
            duration: 4000,
          });
        }
      );
  }
}
