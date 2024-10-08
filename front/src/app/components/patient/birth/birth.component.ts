import { EmployeeService } from 'src/app/services/employee.service';
import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-birth',
  templateUrl: './birth.component.html',
  styleUrls: ['./birth.component.css'],
})
export class BirthComponent implements OnInit {
  birthList$: any;
  employeeID$: any;
  patientID$: any;
  genderID$: any;
  // Map to display data associate with foreign keys
  employeeNameMap: Map<number, string> = new Map()
  patientNameMap: Map<number, string> = new Map()
  genderNameMap: Map<number, string> = new Map()
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
  constructor(private employeeService: EmployeeService,
    private patientService: PatientService,
    private toast: NgToastService,
    ) { }

  ngOnInit(): void {
   //this.birthList$ = this.birthService.getBirthApi();
   this.getChildGenderNameMap();
   this.getEmployeeNameMap();
   this.getPatientNameMap();
   this.getBirthList();
   //
  }

  getBirthList() {
    this.patientService.getBirthApi().subscribe((response) => {
      this.birthList$ = response;
    });
  }
  // Variables (properties)
  modalTitle: string = '';
  activatebirthComponent: boolean = false;
  birthList: any;

  getEmployeeNameMap() {
    this.employeeService.getEmployeeApi().subscribe(res => {
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
  getChildGenderNameMap() {
    this.employeeService.getGenders().subscribe(res => {
      this.genderID$ = res;
      for (let i = 0; i < res.length; i++) {
        this.genderNameMap.set(
          this.genderID$[i].id,
          this.genderID$[i].name,
        );
      }
    });
  }
  getPatientNameMap() {
    this.patientService.getPatientApi().subscribe(res => {
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
    this.birthList = {
      id: 0,
      employeeId: null,
      patientId: null,
      childGender: null,
      description: null,
      date: null
    };
    this.modalTitle = 'Add birth';
    this.activatebirthComponent = true;
  }

  modalEdit(item: any) {
    this.birthList = item;
    this.modalTitle = 'Edit birth';
    this.activatebirthComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete death ${item.id}`)) {
      this.patientService.deleteBirthApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary:
            item.firstName + ' ' + item.lastName + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getBirthList();
      });
    }
  }
  modalClose() {
    this.activatebirthComponent = false;
    //
    this.getBirthList();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getBirthList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getBirthList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.birthList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.birthList.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
      if (a[key] < b[key]) {
        return -1 * direction;
      } else if (a[key] < b[key]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
