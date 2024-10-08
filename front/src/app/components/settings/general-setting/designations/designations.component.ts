import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
@Component({
  selector: 'app-designations',
  templateUrl: './designations.component.html',
  styleUrls: ['./designations.component.css'],
})
export class DesignationsComponent implements OnInit {
  designationList$: any;
  modalTitle: string = '';
  activatedesignationComponent: boolean = false;
  designationList: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 10, 15, 20];

  constructor(
    private designationService: SettingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getDesignationList();
  }
  getDesignationList() {
    this.designationService.getDesignationApi().subscribe((response) => {
      this.designationList$ = response;
    });
  }
  modalAdd() {
    this.designationList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add designation';
    this.activatedesignationComponent = true;
  }

  modalEdit(item: any) {
    this.designationList = item;
    this.modalTitle = 'Edit designation';
    this.activatedesignationComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete designation ${item.id}`)) {
      this.designationService.deleteDesignationApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.getDesignationList();
      });
    }
  }
  modalClose() {
    this.activatedesignationComponent = false;
    this.getDesignationList();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getDesignationList();
  }
  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDesignationList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.designationList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.designationList.sort(
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
