import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-notice-form',
  templateUrl: './notice-form.component.html',
  styleUrls: ['./notice-form.component.css'],
})
export class NoticeFormComponent implements OnInit {
  noticeList$!: Observable<any[]>;

  constructor(
    private noticeService: UtilityService,
    private toast: NgToastService
  ) {}

  @Input() notice: any;
  id: number = 0;
  name: string = '';
  description: string = '';
  noticeBoard: string = '';
  date: string = '';

  ngOnInit(): void {
    this.id = this.notice.id;
    this.name = this.notice.name;
    this.description = this.notice.description;
    this.noticeBoard = this.notice.noticeBoard;
    this.date = this.notice.data;

    this.noticeList$ = this.noticeService.getNoticeApi();
  }

  addNotice() {
    var notice = {
      name: this.name,
      description: this.description,
      noticeBoard: this.noticeBoard,
      date: this.date,
    };
    this.noticeService.addNoticeApi(notice).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: notice.name + ' Sucessfully Added!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('notice-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.noticeList$ = this.noticeService.getNoticeApi();
    });
  }

  updateNotice() {
    var notice = {
      id: this.id,
      name: this.name,
      description: this.description,
      noticeBoard: this.noticeBoard,
      date: this.date,
    };
    var id: number = this.id;
    this.noticeService.updateNoticeApi(id, notice).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: notice.name + ' Sucessfully Updated!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('notice-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.noticeList$ = this.noticeService.getNoticeApi();
    });
  }
}
