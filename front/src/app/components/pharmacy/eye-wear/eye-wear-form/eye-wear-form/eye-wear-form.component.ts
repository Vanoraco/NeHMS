import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import { AdmissionService } from 'src/app/services/admission.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-eye-wear-form',
  templateUrl: './eye-wear-form.component.html',
  styleUrls: ['./eye-wear-form.component.css'],
})
export class EyewearFormPrescriptionComponent implements OnInit {
  AdmissionId: any;
  admissionList: any;
  prescription$!: Observable<any[]>;
  employeeList: any = [];
  employee: any = [];
  email: any;

  @Input() prescription: any; // Input for existing prescription if editing
  rightEyeSphDistant: number = 0;
  rightEyeCylDistant: number = 0;
  rightEyeAxisDistant: number = 0;
  rightEyeSphClose: number = 0;
  rightEyeCylClose: number = 0;
  rightEyeAxisClose: number = 0
  leftEyeSphDistant: number = 0;
  leftEyeCylDistant: number = 0;
  leftEyeAxisDistant: number = 0;
  leftEyeSphClose: number = 0;
  leftEyeCylClose: number = 0;
  leftEyeAxisClose: number = 0;
  far: string = '';
  near: string = '';
  orderDate: string = '';
  employeeId: number = 0;
  patientId: number = 0;

  // New fields
  photoSolar: boolean = false;
  bifocal: boolean = false;
  progressive: boolean = false;
  scratchResistant: boolean = false;
  resinPlastic: boolean = false;
  glareFree: boolean = false;
  hiIndex: boolean = false;
  isUpdating: string = 'Update';
  isSaving: string = 'Save';

  constructor(
    private pharmacyService: PharmacyService,
    private toast: NgToastService,
    private admissionService: AdmissionService,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.AdmissionId = this.route.snapshot.params['admissionId'];
    console.log("Hi")
    this.admissionService
      .getAdmissionByIdApi(this.AdmissionId)
      .subscribe((res) => {
        this.admissionList = res;
        console.log(this.admissionList)
      });
    
    this.prescription$ = this.pharmacyService.getEyewearPrescriptions();

    if (this.prescription) {
      this.populatePrescriptionData();
    }

    this.email = this.authService.getEmailFromToken();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployeeApi().subscribe((data) => {
      this.employeeList = data;
      this.employeeList.forEach((emp) => {
        if (this.email === emp.emailAddress) {
          this.getEmployeeById(emp.id);
        }
      });
    });
  }

  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
    });
  }

  populatePrescriptionData() {
    this.rightEyeSphDistant = this.prescription.rightEyeSphDistant;
    this.rightEyeCylDistant = this.prescription.rightEyeCylDistant;
    this.rightEyeAxisDistant = this.prescription.rightEyeAxisDistant;
    this.rightEyeSphClose = this.prescription.rightEyeSphClose;
    this.leftEyeSphDistant = this.prescription.leftEyeSphDistant;
    this.leftEyeCylDistant = this.prescription.leftEyeCylDistant;
    this.leftEyeAxisDistant = this.prescription.leftEyeAxisDistant;
    this.far = this.prescription.far;
    this.near = this.prescription.near;
    this.orderDate = this.prescription.orderDate;
    this.employeeId = this.prescription.employeeId;
    this.patientId = this.prescription.patientId;
    
    // New fields
    this.photoSolar = this.prescription.photoSolar;
    this.bifocal = this.prescription.bifocal;
    this.progressive = this.prescription.progressive;
    this.scratchResistant = this.prescription.scratchResistant;
    this.resinPlastic = this.prescription.resinPlastic;
    this.glareFree = this.prescription.glareFree;
    this.hiIndex = this.prescription.hiIndex;
  }

  addEyewearPrescription() {
    const prescription = {
      admissionId: this.admissionList.id,
      
      rightEyeCylDistant: this.rightEyeCylDistant,
      rightEyeAxisDistant: this.rightEyeAxisDistant,
      rightEyeSphDistant: this.rightEyeSphDistant ,
      rightEyeSphClose: this.rightEyeSphClose,
      rightEyeCylClose: this.rightEyeCylClose,
      rightEyeAxisClose: this.rightEyeAxisClose,
      leftEyeSphDistant: this.leftEyeSphDistant,
      leftEyeCylDistant: this.leftEyeCylDistant,
      leftEyeAxisDistant: this.leftEyeAxisDistant,
      leftEyeSphClose: this.leftEyeSphClose,
      leftEyeCylClose: this.leftEyeCylClose,
      leftEyeAxisClose: this.leftEyeAxisClose,
      far: this.far,
      near: this.near,
      orderDate: this.orderDate,
      employeeId: this.employee.id,
      patientId: this.admissionList.patientId,
      // New fields
      photoSolar: this.photoSolar,
      bifocal: this.bifocal,
      progressive: this.progressive,
      scratchResistant: this.scratchResistant,
      resinPlastic: this.resinPlastic,
      glareFree: this.glareFree,
      hiIndex: this.hiIndex,
    };
   console.log(prescription)
   this.isSaving = 'Saving'
    this.pharmacyService.addEyewearPrescription(prescription).subscribe(
      (res) => {
        this.isSaving = 'Save'
        this.toastr.success('Sucessfully Added!');
        document.getElementById('pre-modal-close')?.click();
      },
      (err) => {
        this.isSaving = 'Save'
        this.toastr.error('Something went wrong!!!');
      }
    );
  }

  sellEyewearPrescription() {
    const prescription = {
      id: this.prescription.id, // Assuming prescription object has an id
      admissionId: this.admissionList.id,
      rightEyeCylDistant: this.rightEyeCylDistant,
      rightEyeAxisDistant: this.rightEyeAxisDistant,
      rightEyeSphClose: this.rightEyeSphClose,
      leftEyeSphDistant: this.leftEyeSphDistant,
      leftEyeCylDistant: this.leftEyeCylDistant,
      leftEyeAxisDistant: this.leftEyeAxisDistant,
      far: this.far,
      near: this.near,
      orderDate: this.orderDate,
      employeeId: this.employee.id,
      patientId: this.patientId,
      // New fields
      photoSolar: this.photoSolar,
      bifocal: this.bifocal,
      progressive: this.progressive,
      scratchResistant: this.scratchResistant,
      resinPlastic: this.resinPlastic,
      glareFree: this.glareFree,
      hiIndex: this.hiIndex,
      isCancelled: true,
    };

    this.pharmacyService.updateEyewearPrescription(prescription.id, prescription).subscribe(
      (res) => {
        this.toastr.success('Sucessfully Updated!');
        document.getElementById('eyeWearModal')?.click();
      },
      (err) => {
        this.toastr.error('Something went wrong!!!');
      }
    );
  }

  updateEyewearPrescription() {
    const prescription = {
      id: this.prescription.id, // Assuming prescription object has an id
      admissionId: this.admissionList.id,
      rightEyeCylDistant: this.rightEyeCylDistant,
      rightEyeAxisDistant: this.rightEyeAxisDistant,
      rightEyeSphDistant:this.rightEyeSphDistant,
      rightEyeSphClose: this.rightEyeSphClose,
      rightEyeCylClose: this.rightEyeCylClose,
      rightEyeAxisClose: this.rightEyeAxisClose,
      leftEyeSphDistant: this.leftEyeSphDistant,
      leftEyeCylDistant: this.leftEyeCylDistant,
      leftEyeAxisDistant: this.leftEyeAxisDistant,
      leftEyeSphClose: this.leftEyeSphClose,
      leftEyeCylClose: this.leftEyeCylClose,
      leftEyeAxisClose: this.leftEyeAxisClose,
      far: this.far,
      near: this.near,
      orderDate: this.orderDate,
      employeeId: this.employee.id,
      patientId: this.patientId,
      // New fields
      photoSolar: this.photoSolar,
      bifocal: this.bifocal,
      progressive: this.progressive,
      scratchResistant: this.scratchResistant,
      resinPlastic: this.resinPlastic,
      glareFree: this.glareFree,
      hiIndex: this.hiIndex,
    };
    this.isUpdating = 'Updating'
    this.pharmacyService.updateEyewearPrescription(prescription.id, prescription).subscribe(
      (res) => {
        this.isUpdating = 'Update'
        this.toastr.success('Sucessfully Updated!');
        var closeModalBtn = document.getElementById(
          'eye-modal-close'
        );
        if (closeModalBtn) {
          closeModalBtn.click();
          console.log("Closed")
        }
      },
      (err) => {
        this.isUpdating = 'Update'
        this.toastr.error('Something went wrong!!!');
      }
    );
  }
}