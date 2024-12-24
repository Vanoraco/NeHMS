import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.css'],
})
export class PrescriptionComponent implements OnInit {
  prescriptionList$!: any;
  patientList$!: any;
  medicatioList$!: any;
  AdmissionId: number;

  // Variables (properties)
  id: number;
  employeeList: any;
  employee: any = [];
  employeeRole: any = [];
  email: any;
  eachPermission: string;

  modalTitle: string = '';
  activatePrescriptionComponent: boolean = false;
  prescriptions: any;
  userRole: string;

  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];

  // Map to display data associate with foreign keys
  patientListMap: Map<number, string> = new Map();
  employeeMap: Map<number, string> = new Map();
  medicationMap: Map<number, string> = new Map();

  constructor(
    private prescriptionService: PharmacyService,
    private authService: AuthService,
    private employeeService: EmployeeService,
    private patientService: PatientService,
    private pharmacyService: PharmacyService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
   const storedData = localStorage.getItem('Role');

    if (storedData) {
      
      this.userRole = storedData;
      
      console.log(this.userRole) // Assuming 'role' is stored in the patientData object
    }
    this.AdmissionId = this.route.snapshot.params['admissionId'];

    this.getPrescription();
    this.getEmployeeMap();
    this.getPatientNameMap();
    this.getMedicationMap();

    this.email = this.authService.getEmailFromToken();
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let index = 0; index < this.employeeList.length; index++) {
        if (this.email == this.employeeList[index].emailAddress) {
          this.getEmployeeById(this.employeeList[index].id);
        }
      }
    });
  }
  getPrescription() {
    this.prescriptionService.getPrescriptionApi().subscribe((res) => {
      this.prescriptionList$ = res.filter(
        (admission: { admissionId: number }) =>
          admission.admissionId == this.AdmissionId
      );
    });
  }

  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
      this.getEmployeeRole(this.employee.employeeRoleId);
    });
  }

  getEmployeeRole(id: string | number) {
    this.employeeService.getEmployeeRoleByIdApi(id).subscribe((data) => {
      this.employeeRole = data;
    });
  }

  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((data) => {
      this.patientList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.patientListMap.set(
          this.patientList$[i].id,
          this.patientList$[i].firstName + ' ' + this.patientList$[i].lastName
        );
      }
    });
  }

  getEmployeeMap() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      for (let i = 0; i < data.length; i++) {
        this.employeeMap.set(
          this.employeeList[i].id,
          this.employeeList[i].firstName + ' ' + this.employeeList[i].lastName
        );
      }
    });
  }

  getMedicationMap() {
    this.pharmacyService.getMedicationApi().subscribe((data) => {
      this.medicatioList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.medicationMap.set(
          this.medicatioList$[i].id,
          this.medicatioList$[i].name
        );
      }
      console.log(this.prescriptionList$ + 'prescription')
      console.log(Array.from(this.medicationMap.keys()) + 'medication')
    });
  }

  modalAdd() {
    this.prescriptions = {
      id: 0,
      patientId: null,
      employeeId: null,
      admissionId: null,
      medicationId: null,
      prescriptionSubject: null,
      prescriptionDetail: null,
      orderDate: null,
      is_Cancelled: null,
    };
    this.modalTitle = 'Add Prescription';
    this.activatePrescriptionComponent = true;
  }

  modalEdit(item: any) {
    this.prescriptions = item;
    this.modalTitle = 'Edit Prescription';
    this.activatePrescriptionComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete prescription ${item.id}`)) {
      this.prescriptionService
        .deletePrescriptionApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById(
            'prescription-modal-close'
          );
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getPrescription();
        });
    }
  }
  modalClose() {
    this.activatePrescriptionComponent = false;
    this.getPrescription();
  }

  // Variables (properties)
  modalPharmaSalesTitle: string = '';
  activatePhaSalesComponent: boolean = false;
  pharmacySalesList: any;

  modalAddPharmaSales(item: any, medicationData: any, medicationId: any) {
    this.prescriptions = item;
    this.pharmacySalesList = {
      id: 0,
      pahrmacyMedStockId: null,
      amount: 0,
      price: 0,
      employeeId: null,
      timeStamp: null,
      descrption: null,
      medicationData: medicationData,
      medicationId: medicationId
    };
    this.modalPharmaSalesTitle = 'Add Pharmacy Sales';
    this.activatePhaSalesComponent = true;
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getPrescription();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getPrescription();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.prescriptionList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }
}
