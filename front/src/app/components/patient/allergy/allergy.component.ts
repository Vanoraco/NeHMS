import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PatientService } from 'src/app/services/patient.service';
@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {
  allergyList$: any;
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  modalTitle: string = '';
  activateallergyComponent: boolean = false;
  allergyList: any;
  constructor(private allergyService:PatientService,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.getAllergyList();
  }
  getAllergyList(){
    this.allergyService.getAllergyApi().subscribe((response) => {
      this.allergyList$= response;
    });
  }
  modalAdd() {
    this.allergyList = {
      id: 0,
      name: null,
      descrption: null,

    };
    this.modalTitle = 'Add allergy';
    this.activateallergyComponent = true;
  }
  modalEdit(item: any) {
    this.allergyList = item;
    this.modalTitle = 'Edit allergy';
    this.activateallergyComponent = true;
  }
  delete(item: any) {
    if (confirm(`Are you sure you want to delete allergy ${item.id}`)) {
      this.allergyService.deleteAllergyApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getAllergyList();
      });
    }
  }
  modalClose() {
    this.activateallergyComponent = false;
    //
    this.getAllergyList();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getAllergyList();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getAllergyList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.allergyList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.allergyList.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
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
