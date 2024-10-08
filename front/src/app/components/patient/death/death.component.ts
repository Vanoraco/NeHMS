import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { PatientService } from 'src/app/services/patient.service';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-death',
  templateUrl: './death.component.html',
  styleUrls: ['./death.component.css'],
})
export class DeathComponent implements OnInit {
  deathList$: any;
  employeeList$: any;
  employeeID$: any;
  patientID$: any;

  employeeNameMap: Map<number, string> = new Map();
  patientNameMap: Map<number, string> = new Map();
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
  // Map to display data associate with foreign keys
  constructor(
    private employeeService: EmployeeService,
    private toast: NgToastService,
    private patientService: PatientService
  ) {}
  ngOnInit(): void {
    this.getEmployeeNameMap();
    this.getPatientNameMap();
    this.getDeathList();
  }
  // Variables (properties)
  modalTitle: string = '';
  activatedeathComponent: boolean = false;
  deathList: any;

  getDeathList() {
    this.patientService.getDeathApi().subscribe((response) => {
      this.deathList$ = response;
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
    this.deathList = {
      id: 0,
      employeeId: 0,
      patientId: 0,
      descrption: null,
      date: null,
    };
    this.modalTitle = 'Add death';
    this.activatedeathComponent = true;
  }

  modalEdit(item: any) {
    this.deathList = item;
    this.modalTitle = 'Edit death';
    this.activatedeathComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete death ${item.id}`)) {
      this.patientService.deleteDeathApi(item.id).subscribe((res) => {
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
        this.getDeathList();
      });
    }
  }
  modalClose() {
    this.activatedeathComponent = false;
    this.getDeathList();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getDeathList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDeathList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.deathList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.deathList.sort(
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
