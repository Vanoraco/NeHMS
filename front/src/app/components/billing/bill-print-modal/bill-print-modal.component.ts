import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BillingService } from 'src/app/services/billing.service';

@Component({
  selector: 'app-bill-print-modal',
  templateUrl: './bill-print-modal.component.html',
  styleUrls: ['./bill-print-modal.component.css'],
})
export class BillPrintModalComponent implements OnInit {
  @ViewChild('printData') htmlData!: ElementRef;
  serviceChargeList: any = [];
  @Input() BillPrintModalList: any;
  id: number = 0;
  serviceChargeId: number = 0;
  date: string = '';
  patientScheduleId: number = 0;
  employeeId: number = 0;

  constructor(private serCahrgeService: BillingService) {}
  ngOnInit(): void {
    this.id = this.BillPrintModalList.id;
    this.serviceChargeId = this.BillPrintModalList.serviceChargeId;
    this.date = this.BillPrintModalList.date;
    this.employeeId = this.BillPrintModalList.employeeId;
    this.patientScheduleId = this.BillPrintModalList.patientScheduleId;
    this.getServiceCharge();
  }

  getServiceCharge() {
    this.serCahrgeService
      .getServiceChargeByIdApi(this.BillPrintModalList.serviceChargeId)
      .subscribe((res) => {
        this.serviceChargeList = res;
      });
  }

  public printPDF(): void {
    let DATA: any = document.getElementById('printData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('bill-schedule-' + this.id + '.pdf');
    });
  }
}
