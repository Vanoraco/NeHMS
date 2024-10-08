import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { BillingService } from 'src/app/services/billing.service';

@Component({
  selector: 'app-add-edit-service-charge',
  templateUrl: './add-edit-service-charge.component.html',
  styleUrls: ['./add-edit-service-charge.component.css'],
})
export class AddEditServiceChargeComponent implements OnInit {
  serviceChargeList$!: Observable<any[]>;
  constructor(
    private serviceChargeService: BillingService,
    private toast: NgToastService
  ) {}
  @Input() serviceChargeList: any;
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  ngOnInit(): void {
    this.serviceChargeList$ = this.serviceChargeService.getServiceChargeApi();
    this.id = this.serviceChargeList.id;
    this.name = this.serviceChargeList.name;
    this.description = this.serviceChargeList.description;
    this.price = this.serviceChargeList.price;
  }
  addServiceCharge() {
    var serviceChargeList = {
      name: this.name,
      description: this.description,
      price: this.price,
    };
    console.log(serviceChargeList);
    this.serviceChargeService
      .addServiceChargeApi(serviceChargeList)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: serviceChargeList.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.serviceChargeList$ =
          this.serviceChargeService.getServiceChargeApi();
      });
  }
  updateServiceCharge() {
    var servicecharge = {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
    };
    var id: number = this.id;
    this.serviceChargeService
      .updateServiceChargeApi(id, servicecharge)
      .subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: servicecharge.name + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.serviceChargeList$ =
          this.serviceChargeService.getServiceChargeApi();
      });
  }
}
