import { Component, ElementRef, ViewChild, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-print-medical-certificate',
  templateUrl: './print-medical-certificate.component.html',
  styleUrls: ['./print-medical-certificate.component.css'],
})
export class MedicalCertificatePrintComponent implements OnInit {
  @ViewChild('printData') htmlData!: ElementRef;
  medicalCertificateData: any = [];
  employeeName: any = [];

  printId: number = 0;

  constructor(
    private mcService: PatientService,
    private empService: EmployeeService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.printId = this.route.snapshot.params['id'];
    this.mcService
      .getMedicalCertificateByIdApi(this.printId)
      .subscribe((res) => {
        this.medicalCertificateData = res;
        this.getOnePatient(this.medicalCertificateData.employeeId);
      });
  }
  getOnePatient(empId: any) {
    this.empService.getEmployeeByIdApi(empId).subscribe((res) => {
      this.employeeName = res;
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
      PDF.save(
        'medical-certificate-' + this.medicalCertificateData.id + '.pdf'
      );
    });
  }
}
