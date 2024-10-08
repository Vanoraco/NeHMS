import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-bloodgroup-status-form',
  templateUrl: './bloodgroup-status-form.component.html',
  styleUrls: ['./bloodgroup-status-form.component.css'],
})
export class BloodgroupStatusFormComponent implements OnInit {
  bloodgroupStatusList$!: Observable<any[]>;

  constructor(
    private bloodGroupStatusService: UtilityService,
    private toast: NgToastService
  ) {}

  @Input() bloodgroupStatus: any;
  id: number = 0;
  status: string = '';

  ngOnInit(): void {
    this.id = this.bloodgroupStatus.id;
    this.status = this.bloodgroupStatus.status;

    this.bloodgroupStatusList$ = this.bloodGroupStatusService.getBloodGroupStatusApi();
  }

  addbloodgroupStatus() {
    var bloodgroupStatus = {
      status: this.status,
    };
    this.bloodGroupStatusService.addBloodGroupStatusApi(bloodgroupStatus).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: bloodgroupStatus.status + 'Sucessfully Added!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('bloodgroupStatus-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.bloodgroupStatusList$ = this.bloodGroupStatusService.getBloodGroupStatusApi();
    });
  }

  updatebloodgroupStatus() {
    var bloodgroupStatus = {
      id: this.id,
      status: this.status,
    };
    var id: number = this.id;
    this.bloodGroupStatusService.updateBloodGroupStatusApi(id, bloodgroupStatus).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: bloodgroupStatus.status + ' Sucessfully Updated!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('bloodgroupStatus-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.bloodgroupStatusList$ = this.bloodGroupStatusService.getBloodGroupStatusApi();
    });
  }
}
