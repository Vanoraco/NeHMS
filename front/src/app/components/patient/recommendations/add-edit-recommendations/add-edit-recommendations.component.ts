import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-edit-recommendations',
  templateUrl: './add-edit-recommendations.component.html',
  styleUrls: ['./add-edit-recommendations.component.css'],
})
export class AddEditRecommendationsComponent implements OnInit {
  recommendationsList$!: Observable<any[]>;
  getEmployeeList$!: Observable<any[]>;
  getPatientList$!: Observable<any[]>;
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private recommendationsService: PatientService
  ) {}
  @Input() recommendationsList: any;
  id: number = 0;
  employeeId: number = 0;
  patientId: number = 0;
  description: string = '';
  ngOnInit(): void {
    this.getEmployeeList$ = this.employeeService.getEmployeeApi();
    this.getPatientList$ = this.recommendationsService.getPatientApi();
    this.recommendationsList$ =
      this.recommendationsService.getRecommendationApi();
    this.id = this.recommendationsList.id;
    this.employeeId = this.recommendationsList.employeeId;
    this.patientId = this.recommendationsList.patientId;
    this.description = this.recommendationsList.description;
  }
  addRecommendations() {
    var recommendationsList = {
      employeeId: +this.employeeId,
      patientId: +this.patientId,
      description: this.description,
    };
    console.log(recommendationsList);
    this.recommendationsService
      .addRecommendationApi(recommendationsList)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.recommendationsList$ =
          this.recommendationsService.getRecommendationApi();
      });
  }
  updateRecommendations() {
    var recommendations = {
      id: this.id,
      employeeId: +this.employeeId,
      patientId: +this.patientId,
      description: this.description,
    };
    var id: number = this.id;
    this.recommendationsService
      .updateRecommendationApi(id, recommendations)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.recommendationsList$ =
          this.recommendationsService.getRecommendationApi();
      });
  }
}
