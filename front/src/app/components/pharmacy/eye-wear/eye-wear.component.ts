import { Component, OnInit } from '@angular/core';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-eyewear-prescription',
  templateUrl: './eye-wear.component.html',
  styleUrls: ['./eye-wear.component.css'],
})
export class EyewearPrescriptionComponent implements OnInit {
  prescriptions: any[] = [];
  filteredPrescriptions: any[] = [];
  employeeNameMap: Map<number, string> = new Map();
  searchTerm: string = '';
  employeeID$: any;
  
  // Variables for pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  // Modal control
  eyewearcheckupList: any;
  modalTitle: string;
  activateyewearformComponent: boolean = false;

  constructor(
    private pharmacyService: PharmacyService,
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPrescriptions();
    this.getEmployeeNameMap();
  }

  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe((res) => {
      this.employeeID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.employeeNameMap.set(
          this.employeeID$[i].id,
          this.employeeID$[i].firstName +
            ' ' +
            this.employeeID$[i].lastName +
            ` (${this.employeeID$[i].id})`
        );
      }
    });
  }

  loadPrescriptions(): void {
    this.pharmacyService.getEyewearPrescriptions().subscribe((data) => {
      this.prescriptions = data;
      this.filteredPrescriptions = data;
    });
  }

  filterPrescriptions(): void {
    this.filteredPrescriptions = this.prescriptions.filter((p) =>
      p.patient.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddModal(): void {
    this.eyewearcheckupList = {
      id: 0,
      employeeId: null,
      admissionId: null,
      rightEyeSphDistant: null,
      rightEyeCylDistant: null,
      rightEyeAxisDistant: null,
      leftEyeSphDistant: null,
      leftEyeCylDistant: null,
      leftEyeAxisDistant: null,
      rightEyeSphClose: null,
      rightEyeCylClose: null,
      rightEyeAxisClose: null,
      leftEyeSphClose: null,
      leftEyeCylClose: null,
      leftEyeAxisClose: null,
      far: null,
      near: null,
      photoSolar: false,
      bifocal: false,
      progressive: false,
      scratchResistant: false,
      resinPlastic: false,
      glareFree: false,
      hiIndex: false,
    };
    this.modalTitle = 'Add Eyewear Prescription';
    this.activateyewearformComponent = true;
  }

  modalClose(): void {
    this.activateyewearformComponent = false;
    this.loadPrescriptions();
  }

  openEditModal(prescription: any): void {
    this.eyewearcheckupList = prescription;
    this.modalTitle = 'Edit Eyewear Prescription';
    this.activateyewearformComponent = true;
  }

  deletePrescription(id: number): void {
    if (confirm('Are you sure you want to delete this prescription?')) {
      this.pharmacyService.deleteEyewearPrescription(id).subscribe(() => {
        this.toastr.success('Successfully Deleted!');
        this.loadPrescriptions(); // Refresh the list
      });
    }
  }

  onPageChange(event: number): void {
    this.page = event;
    this.loadPrescriptions();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.loadPrescriptions();
  }
}
