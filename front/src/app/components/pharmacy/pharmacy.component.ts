import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrls: ['./pharmacy.component.css'],
})
export class PharmacyComponent implements OnInit {
  pharmacyList$!: Observable<any[]>;
  patientList$: any;

  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();

  constructor(
    private phaervice: PharmacyService,
    private patientService: EmployeeService,
    private toast: NgToastService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.pharmacyList$ = this.phaervice.getPharmacySaleApi();
    this.patientList$ = this.patientService.getPatientApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activatePhaComponent: boolean = false;
  pharmacyList: any;

  modalAdd() {
    this.pharmacyList = {
      id: 0,
      pahrmacyMedStockId: null,
      amount: 0,
      price: 0,
      employeeId: null,
      timeStamp: null,
      descrption: null,
    };
    this.modalTitle = 'Generate pharmacy bill';
    this.activatePhaComponent = true;
  }

  modalEdit(item: any) {
    this.pharmacyList = item;
    this.modalTitle = 'Update pharmacy bill';
    this.activatePhaComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete pharmacy  ${item.id}`)) {
      this.phaervice.deletePharmacySaleApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.pharmacyList$ = this.phaervice.getPharmacySaleApi();
      });
    }
  }
  modalClose() {
    this.activatePhaComponent = false;
    this.pharmacyList$ = this.phaervice.getPharmacySaleApi();
  }
}
