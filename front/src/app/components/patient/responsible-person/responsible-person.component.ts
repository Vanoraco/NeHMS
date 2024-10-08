import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-responsible-person',
  templateUrl: './responsible-person.component.html',
  styleUrls: ['./responsible-person.component.css'],
})
export class ResponsiblePersonComponent implements OnInit {
  responsiblePersonList$: any = [];
  countryList$: any;
  cityList$: any;
  relationshipList$: any;
  patientList$: any;

  // Variables (properties)
  modalTitle: string = '';
  activateResponsiblePersonComponent: boolean = false;
  responsiblePersonList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'responsible-person.xlsx';
  //Map to display data associate with foreign keys
  patientMap: Map<number, string> = new Map();
  cityMap: Map<number, string> = new Map();
  countryMap: Map<number, string> = new Map();
  relationshipMap: Map<number, string> = new Map();


  constructor(
    private responsiblePersonService: PatientService,
    private dataService: EmployeeService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {

    this.getResponsiblePersonList();
    this.getPatientMap();
    this.getCountryMap();
    this.getCityMap();
    this.getRelationshipMap();
  }

  getResponsiblePersonList() {
    this.responsiblePersonService
      .getResponsiblePersonApi()
      .subscribe((response) => {
        this.responsiblePersonList$ = response
        this.sort('id');
      });
  }

  getPatientMap() {
    this.responsiblePersonService.getPatientApi().subscribe((data) => {
      this.patientList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.patientMap.set(
          this.patientList$[i].id,
          this.patientList$[i].firstName +
            ' ' +
            this.patientList$[i].lastName +
            ` (${this.patientList$[i].id})`
        );
      }
    });
  }
  getCountryMap() {
    this.dataService.getCountries().subscribe((data) => {
      this.countryList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.countryMap.set(this.countryList$[i].id, this.countryList$[i].name);
      }
    });
  }

  getCityMap() {
    this.dataService.getCountries().subscribe((data) => {
      this.cityList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.cityMap.set(this.cityList$[i].id, this.cityList$[i].name);
      }
    });
  }

  getRelationshipMap() {
    this.responsiblePersonService.getRelationshipApi().subscribe((data) => {
      this.relationshipList$ = data;
      for (let i = 0; i < data.length; i++) {
        this.relationshipMap.set(this.relationshipList$[i].id, this.relationshipList$[i].name);
      }
    });
  }

  modalAdd() {
    this.responsiblePersonList = {
      id: 0,
      firstName: null,
      lastName: null,
      phone: null,
      address: null,
      relationshipId: null,
      countryId: null,
      cityId: null,
      patientId: null,
    };
    this.modalTitle = 'Add Responsible Person';
    this.activateResponsiblePersonComponent = true;
  }

  modalEdit(item: any) {
    this.responsiblePersonList = item;
    this.modalTitle = 'Edit Responsible Person';
    this.activateResponsiblePersonComponent = true;
  }

  delete(item: any) {
    if (
      confirm(`Are you sure you want to delete Responsible Person ${item.id}`)
    ) {
      this.responsiblePersonService
        .deleteResponsiblePersonApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Sucessfully Deleted!',
            duration: 4000,
          });
          this.getResponsiblePersonList();
        });
    }
  }
  modalClose() {
    this.activateResponsiblePersonComponent = false;
    this.getResponsiblePersonList();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getResponsiblePersonList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getResponsiblePersonList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.responsiblePersonList$.filter((res: any) => {
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
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('responsible-person-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
