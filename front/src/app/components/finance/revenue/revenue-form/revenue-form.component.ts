import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { RevenueService } from 'src/app/services/revenue.service';

@Component({
  selector: 'app-revenue-form',
  templateUrl: './revenue-form.component.html',
  styleUrls: ['./revenue-form.component.css'],
})
export class RevenueFormComponent implements OnInit {
  revenueList$: any;
  revenueCategoryId$: any;

  constructor(
    private revenueService: RevenueService,
    private toast: NgToastService
  ) {}

  @Input() revenueList: any;
  id: number = 0;
  revenueCategoryId: number = 0;
  amount: number = 0;
  date: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.revenueList.id;
    this.revenueCategoryId = this.revenueList.revenueCategoryId;
    this.amount = this.revenueList.amount;
    this.date = this.revenueList.date;
    this.description = this.revenueList.description;
    this.revenueList$ = this.revenueService.getRevenueApi();
    this.revenueCategoryId$ = this.revenueService.getRevenueCategoryApi();
  }

  addRevenue() {
    var revenueList = {
      revenueCategoryId: +this.revenueCategoryId,
      amount: +this.amount,
      date: this.date,
      description: this.description,
    };
    console.log(revenueList);
    this.revenueService.addRevenueApi(revenueList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
  updateRevenue() {
    var revenueList = {
      id: this.id,
      revenueCategoryId: +this.revenueCategoryId,
      amount: +this.amount,
      date: this.date,
      description: this.description,
    };
    var id: number = this.id;
    console.log(revenueList);

    this.revenueService.updateRevenueApi(id, revenueList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Something went wrong!',
          duration: 4000,
        });
      }
    );
  }
}
