import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BillingService } from 'src/app/services/billing.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-bill-lab-print-modal',
  templateUrl: './bill-lab-print-modal.component.html',
  styleUrls: ['./bill-lab-print-modal.component.css'],
})
export class BillLabPrintModalComponent implements OnInit {
  @ViewChild('printData') htmlData!: ElementRef;
  serviceChargeList: any = [];
  employeeList: any = [];
  @Input() BillLabPrintModalList: any;
  id: number = 0;
  labRequestId: number = 0;
  employeeId: number = 0;
  serviceChargeId: number = 0;
  date: string = '';
  description: string = '';

  constructor(
    private serCahrgeService: BillingService,
    private empService: EmployeeService
  ) {}
  ngOnInit(): void {
    this.id = this.BillLabPrintModalList.id;
    this.serviceChargeId = this.BillLabPrintModalList.serviceChargeId;
    this.date = this.BillLabPrintModalList.date;
    this.employeeId = this.BillLabPrintModalList.employeeId;
    this.labRequestId = this.BillLabPrintModalList.labRequestId;
    this.getServiceCharge();
    this.getEmployee();
  }
  getEmployee() {
    this.empService
      .getEmployeeByIdApi(this.BillLabPrintModalList.employeeId)
      .subscribe((res) => {
        this.employeeList = res;
      });
  }

  getServiceCharge() {
    this.serCahrgeService
      .getServiceChargeByIdApi(this.BillLabPrintModalList.serviceChargeId)
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
      PDF.save('bill-lab-' + this.id + '.pdf');
    });
  }
}
