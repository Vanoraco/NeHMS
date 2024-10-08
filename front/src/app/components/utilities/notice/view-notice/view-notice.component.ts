import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/services/utility.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-notice',
  templateUrl: './view-notice.component.html',
  styleUrls: ['./view-notice.component.css'],
})
export class ViewNoticeComponent implements OnInit {
  noticeId: any;
  noticeData: any;

  constructor(
    private route: ActivatedRoute,
    private noticeService: UtilityService
  ) {}

  ngOnInit() {
    this.noticeId = this.route.snapshot.params['id'];
    this.noticeService.getNoticeByIdApi(this.noticeId).subscribe((res) => {
      this.noticeData = res;
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
      PDF.save(this.noticeData.noticeBoard + '-notice' + '.pdf');
    });
  }
}
