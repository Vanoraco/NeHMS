import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BillingService } from 'src/app/services/billing.service';
@Component({
  selector: 'app-service-charge',
  templateUrl: './service-charge.component.html',
  styleUrls: ['./service-charge.component.css'],
})
export class ServiceChargeComponent implements OnInit {
  modalTitle: string = '';
  activateServiceChargeComponent: boolean = false;
  serviceChargeList: any;
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
  serviceChargeList$!: any;
  constructor(
    private serviceChargeService: BillingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getServiceCharges();
  }
  getServiceCharges() {
    this.serviceChargeService.getServiceChargeApi().subscribe((res) => {
      this.serviceChargeList$ = res;
    });
  }

  modalAdd() {
    this.serviceChargeList = {
      id: 0,
      name: null,
      descrption: null,
    };
    this.modalTitle = 'Add service charge';
    this.activateServiceChargeComponent = true;
  }

  modalEdit(item: any) {
    this.serviceChargeList = item;
    this.modalTitle = 'Edit service charge';
    this.activateServiceChargeComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Service Charge ${item.id}`)) {
      this.serviceChargeService
        .deleteServiceChargeApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: item.name + ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getServiceCharges();
        });
    }
  }
  modalClose() {
    this.activateServiceChargeComponent = false;
    //
    this.getServiceCharges();
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getServiceCharges();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getServiceCharges();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.serviceChargeList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.serviceChargeList.sort(
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
