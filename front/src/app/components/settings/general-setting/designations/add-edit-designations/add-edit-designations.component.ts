import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
@Component({
  selector: 'app-add-edit-designations',
  templateUrl: './add-edit-designations.component.html',
  styleUrls: ['./add-edit-designations.component.css'],
})
export class AddEditDesignationsComponent implements OnInit {
  designationList$: any;
  constructor(
    private designationService: SettingService,
    private toast: NgToastService
  ) {}
  @Input() designationList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.designationList$ = this.designationService.getDesignationApi();
    this.id = this.designationList.id;
    this.name = this.designationList.name;
    this.description = this.designationList.description;
  }
  addDesignation() {
    var designationList = {
      name: this.name,
      description: this.description,
    };
    console.log(designationList);
    this.designationService
      .addDesignationApi(designationList)
      .subscribe((res) => {
        var closeModalBtn = document.getElementById('modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      });
  }
  updateDesignation() {
    var designationList = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.designationService.updateDesignationApi(id, designationList).subscribe(
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
