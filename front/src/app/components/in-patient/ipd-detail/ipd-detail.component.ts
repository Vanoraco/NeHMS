import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-ipd-detail',
  templateUrl: './ipd-detail.component.html',
  styleUrls: ['./ipd-detail.component.css'],
})
export class IpdDetailComponent implements OnInit {
  inPatientId: any = [];
  language: any = [];
  city: any = [];
  country: any = [];
  gender: any = [];
  bloodGroup: any = [];
  maritalStatus: any = [];
  id: number;

  educationLevelNameMap: Map<number, string> = new Map();
  languageMap: Map<number, string> = new Map();
  cityMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();
  genderMap: Map<number, string> = new Map();
  bloodGroupMap: Map<number, string> = new Map();
  maritalStatusMap: Map<number, string> = new Map();

  constructor(
    public patientService: PatientService,
    public educationLevelService: SettingService,
    public dataService: EmployeeService,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['patientId'];
    this.patientService.getPatientByIdApi(this.id).subscribe((data) => {
      this.inPatientId = data;
      this.geteducationLevelMap(this.inPatientId.educationLevelId);
      this.getLanguagesMap(this.inPatientId.languageId);
      this.getCitiesMap(this.inPatientId.cityId);
      this.getCountryMap(this.inPatientId.countryId);
      this.getGenderMap(this.inPatientId.genderId);
      this.getBloodGroupMap(this.inPatientId.bloodGroupId);
      this.getMaritalStatusMap(this.inPatientId.maritalStatusId);
    });
  }
  geteducationLevelMap(id: any) {
    this.educationLevelService
      .getEducationLevelByIdApi(id)
      .subscribe((res: any) => {
        this.educationLevelNameMap.set(res.id, res.name);
      });
  }
  getGenderMap(id: any) {
    this.dataService.getGenders().subscribe((res: any) => {
      this.gender = res;
      for (let i = 0; i < res.length; i++) {
        if (this.gender[i].id === id) {
          this.genderMap.set(this.gender[i].id, this.gender[i].name);
        }
      }
    });
  }
  getLanguagesMap(id: any) {
    this.dataService.getLanguages().subscribe((res: any) => {
      this.language = res;
      for (let i = 0; i < res.length; i++) {
        if (this.language[i].id === id) {
          this.languageMap.set(this.language[i].id, this.language[i].name);
        }
      }
    });
  }
  getBloodGroupMap(id: any) {
    this.dataService.getBloodGroupApi().subscribe((res: any) => {
      this.bloodGroup = res;
      for (let i = 0; i < res.length; i++) {
        if (this.bloodGroup[i].id === id) {
          this.bloodGroupMap.set(
            this.bloodGroup[i].id,
            this.bloodGroup[i].name
          );
        }
      }
    });
  }
  getMaritalStatusMap(id: any) {
    switch (id) {
      case 1:
        this.maritalStatusMap.set(this.inPatientId.maritalStatusId, 'Single');
        break;
      case 2:
        this.maritalStatusMap.set(this.inPatientId.maritalStatusId, 'Married');
        break;
      case 3:
        this.maritalStatusMap.set(this.inPatientId.maritalStatusId, 'Widowed');
        break;
      case 4:
        this.maritalStatusMap.set(this.inPatientId.maritalStatusId, 'Divorced');
        break;
      default:
        this.maritalStatusMap.set(this.inPatientId.maritalStatusId, 'Single');
        break;
    }
  }
  getCountryMap(id: any) {
    this.dataService.getCountries().subscribe((res: any) => {
      this.country = res;
      for (let i = 0; i < res.length; i++) {
        if (this.country[i].id === id) {
          this.countryMap.set(this.country[i].id, this.country[i].name);
        }
      }
    });
  }
  getCitiesMap(id: any) {
    this.dataService.getCities().subscribe((res: any) => {
      this.city = res;
      for (let i = 0; i < res.length; i++) {
        if (this.city[i].id === id) {
          this.cityMap.set(this.city[i].id, this.city[i].name);
        }
      }
    });
  }
}
