import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';


@Component({
  selector: 'app-pharmacy-sales-form',
  templateUrl: './pharmacy-sales-form.component.html',
  styleUrls: ['./pharmacy-sales-form.component.css'],
})
export class PharmacySalesFormComponent implements OnInit {
  pharmacySalesList: any;
  pharmacyMedStockList: any;
  employeeList: any;
  avaQuantity = 0;
  submitted: boolean = false;
  prescriptionList$!: Observable<any>;

  @ViewChild('content') pharmacySalesModal!: ElementRef;
  @Input() prescriptionListOne: any;
  presId: number = 0;
  @Input() pharmacySalesData: any;
  id: number = 0;
  pahrmacyMedStockId: number = 0;
  amount: number = 0;
  price: number = 0;
  employeeId: number = 0;
  timeStamp: string = '';
  descrption: string = '';
  medicatioList$: any;

  medicationMap: Map<number, string> = new Map();
  filteredStock: any;
  oneEmployee: any;
  constructor(
    private phaSalesService: PharmacyService,
    private pharmacyService: PharmacyService,
    private employeeService: EmployeeService,
    private builder: FormBuilder,
    private toastr: NgToastService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    // this.phaSalesService
    //   .getPrescriptionByIdApi(this.pharmacySalesData.presId)
    //   .subscribe((res) => {
    //     this.prescriptionListOne = res;
    //     this.presId = this.prescriptionListOne.id;
    //   });
    // console.log('Pres Id : ' + this.prescriptionListOne.id);

    this.getPharmacySalesData();
    this.getPharmacyStockData();
    this.getEmployeeData();
    this.getMedicationMap();
  }

  formData = this.builder.group({
    pharmacyMedStockId: this.builder.control(null, Validators.required),
    amount: this.builder.control(0, Validators.required),
    employeeId: this.builder.control(null, Validators.required),
    price: this.builder.control(0, Validators.required),
    timeStamp: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
  });

  getPharmacySalesData() {
    this.phaSalesService.getPharmacySaleApi().subscribe((res) => {
      this.pharmacySalesList = res;
    });
  }

  getPharmacyStockData() {
    this.phaSalesService.getPharmacyMedStockApi().subscribe((res) => {
      this.pharmacyMedStockList = res;
      this.filteredStock = this.pharmacyMedStockList.filter(stock => stock.medicationId === this.pharmacySalesData.medicationId);

    
    console.log('Filtered Stock:', this.filteredStock);
      console.log(this.pharmacyMedStockList);
    });
  }

  getEmployeeData() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeList = res.filter(
        (employee: { employeeRoleId: number }) => employee.employeeRoleId == 4
      );
      
      this.oneEmployee = this.employeeList

      if (this.oneEmployee.length > 0) {
        this.formData.get('employeeId')?.setValue(this.oneEmployee[0].id); // Set the default to the first employee
      }
      console.log(this.oneEmployee)
    });
  }

  getQuantity() {
    let stockId = this.formData.get('pharmacyMedStockId')?.value;
    this.phaSalesService.getPharmacyMedStockIdApi(stockId).subscribe(
      (res) => {
        let stockItem: any;
        stockItem = res;
        if (stockItem != null) {
          this.formData.get('price')?.setValue(stockItem.price);
          this.avaQuantity = stockItem.quantity;
        }
      },
      (err) => {
        this.toast.error(
           'Please select medicine stock list!',
      
        );
      }
    );
  }
  stockItem: any = [];

  getMedicationMap() {
    this.pharmacyService.getMedicationApi().subscribe((data) => {
      this.medicatioList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.medicationMap.set(
          this.medicatioList$[i].id,
          this.medicatioList$[i].name
        );
      }
      console.log(this.pharmacyMedStockList)
    });
    console.log(this.medicationMap);
    console.log(this.pharmacySalesData.medicationId)
  }

  filterMedication(id: number){
     
  }

  priceCalculation() {
    let stockId = this.formData.get('pharmacyMedStockId')?.value;
    this.phaSalesService.getPharmacyMedStockIdApi(stockId).subscribe(
      (res) => {
        this.stockItem = res;
        if (this.stockItem != null) {
          let qty = this.formData.get('amount')?.value;
          let price = this.stockItem.price;
          let totalPrice = qty * price;
          if (qty > this.stockItem.quantity) {
            alert('Not available quantity');
          } else {
            this.formData.get('price')?.setValue(totalPrice);
            this.avaQuantity = this.stockItem.quantity - qty;
          }
        }
      },
      (err) => {
        this.toast.error(
           'Please select medicine stock list!',
         
        );
      }
    );
  }

  savePharmacySales() {
    if (this.id == 0) {
      this.addPharmacySales();
    } else {
      this.updatePharmacySales();
    }
  }

  updateMedStockQuantity() {
    var medStockItem = {
      id: this.stockItem.id,
      medicationId: this.stockItem.medicationId,
      batchNumber: this.stockItem.batchNumber,
      expirationDate: this.stockItem.expirationDate,
      quantity: this.avaQuantity,
      price: this.stockItem.price,
      employeeId: this.stockItem.employeeId,
      timeStamp: this.stockItem.timeStamp,
      medSupplierId: this.stockItem.medSupplierId,
      name: this.stockItem.name,
      description: this.stockItem.description,
    };
    console.log(medStockItem);
    this.phaSalesService
      .updatePharmacyMedStockApi(this.stockItem.id, medStockItem)
      .subscribe((res) => {
        this.toast.success(
           'Medicine Stock Quantity Updated : ' + medStockItem.quantity,
          );
        console.log(res);
      });
  }

  updatePrescription() {
    var prescriptionList = {
      id: this.prescriptionListOne.id,
      medicationId: +this.prescriptionListOne.medicationId,
      employeeId: +this.prescriptionListOne.employeeId,
      patientId: +this.prescriptionListOne.patientId,
      admissionId: +this.prescriptionListOne.admissionId,
      prescriptionSubject: this.prescriptionListOne.prescriptionSubject,
      prescriptionDetail: this.prescriptionListOne.prescriptionDetail,
      orderDate: this.prescriptionListOne.orderDate,
      is_Cancelled: true,
    };
    var id: number = this.prescriptionListOne.id;
    console.log(prescriptionList);

    this.phaSalesService.updatePrescriptionApi(id, prescriptionList).subscribe(
      (res) => {
        this.toast.success( 'Sucessfully Updated!',
          );
        this.prescriptionList$ = this.phaSalesService.getPrescriptionApi();
      },
      (err) => {
        this.toast.error( 'Something went wrong!',
         );
      }
    );
  }

  addPharmacySales() {
    this.submitted = true;
    
    // Call the service to add the pharmacy sale
    this.phaSalesService.addPharmacySaleApi(this.formData.value).subscribe({
        next: (res) => {
            console.log(this.formData.value); // Log the form data
            this.toast.success(
                
                 'Successfully Added!',
                
            );
            this.updateMedStockQuantity(); // Update the medication stock quantity
            this.updatePrescription(); // Update the prescription

            // Close the modal if it exists
            const closeModalBtn = document.getElementById('add-edit-modal-close');
            if (closeModalBtn) {
                closeModalBtn.click();
            }

            // Refresh the pharmacy sales data
            this.getPharmacySalesData();
        },
        error: (err) => {
            console.error('Error adding pharmacy sale:', err); // Log the error for debugging
            this.toast.error(
                 'Something went wrong!',
                
            );
        },
        complete: () => {
            console.log('Pharmacy sale addition completed'); // Optional: Log when the call is complete
        }
    });
}


  get controls() {
    return this.formData.controls;
  }

  // var id: number = this.id;
  loadEditData(id: number) {
    this.phaSalesService.getPharmacySaleByIdApi(id).subscribe((res) => {
      this.pharmacySalesList = res;
      this.formData.setValue({
        pharmacyMedStockId: this.pharmacySalesList.pharmacyMedStockId,
        amount: this.pharmacySalesList.amount,
        employeeId: this.pharmacySalesList.employeeId,
        price: this.pharmacySalesList.price,
        timeStamp: this.pharmacySalesList.timeStamp,
        description: this.pharmacySalesList.description,
      });
    });
  }

  updatePharmacySales() {
    var id: number = this.id;
    this.phaSalesService
      .updatePharmacySaleApi(id, this.formData.value)
      .subscribe(
        (res) => {
          this.toast.success( 'Sucessfully Updated!',
            );
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getPharmacySalesData();
        },
        (err) => {
          this.toast.error('Something went wrong!',
           );
        }
      );
  }
}
