import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-permission-form',
  templateUrl: './permission-form.component.html',
  styleUrls: ['./permission-form.component.css'],
})
export class PermissionFormComponent implements OnInit {
  permissionList$: any;
  constructor(
    private permissionService: SettingService,
    private toast: NgToastService
  ) {}

  @Input() permissionList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.permissionList.id;
    this.name = this.permissionList.name;
    this.description = this.permissionList.description;
    this.permissionList$ = this.permissionService.getPermissionApi();
  }

  addPermission() {
    var permissionList = {
      name: this.name,
      description: this.description,
    };
    console.log(permissionList);
    this.permissionService.addPermissionApi(permissionList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Added!',
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
  updatePermission() {
    var permissionList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    console.log(permissionList);

    this.permissionService.updatePermissionApi(id, permissionList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: this.name + ' Sucessfully Updated!',
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
