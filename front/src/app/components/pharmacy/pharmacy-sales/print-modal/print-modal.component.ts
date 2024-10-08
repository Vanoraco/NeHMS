import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-print-modal',
  templateUrl: './print-modal.component.html',
  styleUrls: ['./print-modal.component.css'],
})
export class PrintModalComponent implements OnInit {
  @ViewChild('printData') htmlData!: ElementRef;

  @Input() PrintModalList: any;
  id: number = 0;
  pahrmacyMedStockId: number = 0;
  amount: number = 0;
  price: number = 0;
  employeeId: number = 0;
  timeStamp: string = '';
  descrption: string = '';

  ngOnInit(): void {
    this.id = this.PrintModalList.id;
    this.pahrmacyMedStockId = this.PrintModalList.pahrmacyMedStockId;
    this.amount = this.PrintModalList.amount;
    this.employeeId = this.PrintModalList.employeeId;
    this.price = this.PrintModalList.price;
    this.timeStamp = this.PrintModalList.timeStamp;
    this.descrption = this.PrintModalList.descrption;
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
      PDF.save('pharmacy-sales-' + this.id + '.pdf');
    });
  }
}
