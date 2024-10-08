import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { AdmissionService } from 'src/app/services/admission.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-add-edit-pre-exam-check-up',
  templateUrl: './add-edit-pre-exam-check-up.component.html',
  styleUrls: ['./add-edit-pre-exam-check-up.component.css'],
})
export class AddEditPreExamCheckUpComponent implements OnInit {
  preexamcheckupList$!: Observable<any[]>;
  admissionList: any;
  AdmissionId: number;
  employeeList: any = [];
  employee: any = [];
  employeeRole: any = [];
  email: any;
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private preExamcheckupService: PatientService,
    private admissionService: AdmissionService,
    private route: ActivatedRoute,
    private toast: NgToastService
  ) {}
  @Input() preexamcheckupList: any;
  id: number = 0;
  employeeId: number = 0;
  admissionId: number = 0;
  weight: number = 0;
  height: number = 0;
  pain: string = '';
  bp: string = '';
  symptom: string = '';
  severity: string = '';

  ngOnInit(): void {
    this.AdmissionId = this.route.snapshot.params['admissionId'];
    this.admissionService
      .getAdmissionByIdApi(this.AdmissionId)
      .subscribe((res) => {
        this.admissionList = res;
      });
    this.preexamcheckupList$ =
      this.preExamcheckupService.getPreExamCheckupApi();
    this.id = this.preexamcheckupList.id;
    this.weight = this.preexamcheckupList.weight;
    this.height = this.preexamcheckupList.height;
    this.pain = this.preexamcheckupList.pain;
    this.bp = this.preexamcheckupList.bp;
    this.symptom = this.preexamcheckupList.symptom;
    this.severity = this.preexamcheckupList.severity;

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
  getEmployeeById(id: string | number) {
    this.employeeService.getEmployeeByIdApi(id).subscribe((data) => {
      this.employee = data;
    });
  }
  addPreexamcheckup() {
    var preexamcheckupList = {
      employeeId: +this.employee.id,
      admissionId: +this.admissionList.id,
      height: +this.height,
      weight: +this.weight,
      pain: this.pain,
      bp: this.bp,
      symptom: this.symptom,
      severity: this.severity,
    };
    console.log(preexamcheckupList);
    this.preExamcheckupService
      .addPreExamCheckupApi(preexamcheckupList)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Added!',
            duration: 4000,
          });
          document.getElementById('pre-modal-close').click();
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
  updatePreexamcheckup() {
    var preexamcheckup = {
      id: this.id,
      employeeId: +this.employee.id,
      admissionId: +this.admissionList.id,
      height: +this.height,
      weight: +this.weight,
      pain: this.pain,
      bp: this.bp,
      symptom: this.symptom,
      severity: this.severity,
    };
    var id: number = this.id;
    this.preExamcheckupService
      .updatePreExamCheckupApi(id, preexamcheckup)
      .subscribe(
        (res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Updated!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('pre-modal-close');
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
