import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PharmacyService } from 'src/app/services/pharmacy.service';

@Component({
  selector: 'app-prescription-form',
  templateUrl: './prescription-form.component.html',
  styleUrls: ['./prescription-form.component.css'],
})
export class PrescriptionFormComponent implements OnInit {
  prescriptionList$!: Observable<any[]>;
  medicationId$!: Observable<any[]>;
  admissionId$!: any;
  employeeList$!: any;
  patientId$!: any;

  AdmissionId: number = 0;
  email: string = '';
  employee: any = [];
  constructor(
    private prescriptionService: PharmacyService,
    private employeeService: EmployeeService,
    private admissionService: AdmissionService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}

  @Input() prescriptionData: any;
  id: number = 0;
  medicationId: number = 0;
  employeeId: number = 0;
  patientId: number = 0;
  admissionId: number = 0;
  prescriptionSubject: string = '';
  prescriptionDetail: string = '';
  orderDate: string = '';
  is_Cancelled: string = '';

  ngOnInit(): void {
    this.AdmissionId = this.route.snapshot.params['admissionId'];

    this.id = this.prescriptionData.id;
    this.medicationId = this.prescriptionData.medicationId;
    this.prescriptionSubject = this.prescriptionData.prescriptionSubject;
    this.prescriptionDetail = this.prescriptionData.prescriptionDetail;
    this.orderDate = this.prescriptionData.orderDate;
    this.is_Cancelled = this.prescriptionData.is_Cancelled;

    this.prescriptionList$ = this.prescriptionService.getPrescriptionApi();
    this.medicationId$ = this.prescriptionService.getMedicationApi();
    this.getAdmission(this.AdmissionId);

    this.email = this.authService.getEmailFromToken();
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList$ = data;
      for (let index = 0; index < this.employeeList$.length; index++) {
        if (this.email == this.employeeList$[index].emailAddress) {
          this.getEmployeeById(this.employeeList$[index].id);
        }
      }
    });
  }
  getAdmission(id: number = this.AdmissionId) {
    this.admissionService.getAdmissionByIdApi(id).subscribe((res) => {
      this.admissionId$ = res;
    });
  }

  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
    });
  }
  addPrescription() {
    var prescriptionList = {
      medicationId: +this.medicationId,
      employeeId: +this.employee.id,
      patientId: +this.admissionId$.patientId,
      admissionId: +this.admissionId$.id,
      prescriptionSubject: this.prescriptionSubject,
      prescriptionDetail: this.prescriptionDetail,
      orderDate: this.orderDate,
      is_Cancelled: this.is_Cancelled == 'true' ? true : false,
    };
    console.log(prescriptionList);
    this.prescriptionService.addPrescriptionApi(prescriptionList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('prescription-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.prescriptionList$ = this.prescriptionService.getPrescriptionApi();
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
  updatePrescription() {
    var prescriptionList = {
      id: this.id,
      medicationId: +this.medicationId,
      employeeId: +this.employee.id,
      patientId: +this.admissionId$.patientId,
      admissionId: +this.admissionId$.id,
      prescriptionSubject: this.prescriptionSubject,
      prescriptionDetail: this.prescriptionDetail,
      orderDate: this.orderDate,
      is_Cancelled: this.is_Cancelled == 'true' ? true : false,
    };
    var id: number = this.id;
    console.log(prescriptionList);

    this.prescriptionService
      .updatePrescriptionApi(id, prescriptionList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'Success',
            summary: 'Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById(
            'prescription-modal-close'
          );
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.prescriptionList$ =
            this.prescriptionService.getPrescriptionApi();
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
