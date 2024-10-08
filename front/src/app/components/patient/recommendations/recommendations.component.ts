import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css'],
})
export class RecommendationsComponent implements OnInit {
  recommendationsList$: any;
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];
  employeeID$: any;
  patientID$: any;
  employeeNameMap: Map<number, string> = new Map();
  patientNameMap: Map<number, string> = new Map();
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private patientService: PatientService,
    private recommendationsService: PatientService
  ) {}

  ngOnInit(): void {
    this.getEmployeeNameMap();
    this.getPatientNameMap();
    this.getRecommendation();
  }
  modalTitle: string = '';
  activaterecommendationsComponent: boolean = false;
  recommendationsList: any;
  getRecommendation() {
    this.recommendationsService.getRecommendationApi().subscribe((response) => {
      this.recommendationsList$ = response;
    });
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
  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe((res) => {
      this.patientID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.patientNameMap.set(
          this.patientID$[i].id,
          this.patientID$[i].firstName +
            ' ' +
            this.patientID$[i].lastName +
            ` (${this.patientID$[i].id})`
        );
      }
    });
  }
  modalAdd() {
    this.recommendationsList = {
      id: 0,
      employeeId: null,
      patientId: null,
      description: null,
    };
    this.modalTitle = 'Add Recommendations';
    this.activaterecommendationsComponent = true;
  }

  modalEdit(item: any) {
    this.recommendationsList = item;
    this.modalTitle = 'Edit Recommendations';
    this.activaterecommendationsComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete recommendations ${item.id}`)) {
      this.recommendationsService
        .deleteRecommendationApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('add-edit-modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getRecommendation();
        });
    }
  }
  
  modalClose() {
    this.activaterecommendationsComponent = false;
    this.getRecommendation();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getRecommendation();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRecommendation();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.recommendationsList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.recommendationsList.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[key] < b[key]) {
          return -1 * direction;
        } else if (a[key] < b[key]) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    );
  }
}
