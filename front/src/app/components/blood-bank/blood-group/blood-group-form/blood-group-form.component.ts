import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-blood-group-form',
  templateUrl: './blood-group-form.component.html',
  styleUrls: ['./blood-group-form.component.css'],
})
export class BloodGroupFormComponent implements OnInit {
  bloodGroupList$!: Observable<any[]>;
  bloodGroupStatusList$!: Observable<any[]>;

  constructor(
    private bloodGroupService: UtilityService,
    private toast: NgToastService
  ) {}

  @Input() bloodGroupList: any;
  id: number = 0;
  bloodGroupStatusId: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.bloodGroupList.id;
    this.bloodGroupStatusId = this.bloodGroupList.expenseCatagoryId;
    this.name = this.bloodGroupList.name;
    this.description = this.bloodGroupList.description;

    this.bloodGroupList$ = this.bloodGroupService.getBloodGroupApi();
    this.bloodGroupStatusList$ = this.bloodGroupService.getBloodGroupStatusApi();
  }

  addBloodGroup() {
    var bloodGroupList = {
      bloodGroupStatusId: +this.bloodGroupStatusId,
      name: this.name,
      description: this.description,
    };
    console.log(bloodGroupList);
    this.bloodGroupService.addBloodGroupApi(bloodGroupList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Added!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
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

  updateBloodGroup() {
    var bloodGroupList = {
      id: this.id,
      bloodGroupStatusId: +this.bloodGroupStatusId,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.bloodGroupService.updateBloodGroupApi(id, bloodGroupList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Updated!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
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
