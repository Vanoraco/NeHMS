import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-add-edit-educationlevel',
  templateUrl:
    '../add-edit-educationlevel/add-edit-educationlevel.component.html',
  styleUrls: [
    '../add-edit-educationlevel/add-edit-educationlevel.component.css',
  ],
})
export class AddEditEducationlevelComponent implements OnInit {
  educationlevelList$!: Observable<any[]>;

  constructor(private educationLevelService: SettingService, private toast: NgToastService) {}

  @Input() educationlevel: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.educationlevel.id;
    this.name = this.educationlevel.name;
    this.description = this.educationlevel.description;

    this.educationlevelList$ = this.educationLevelService.getEducationLevelApi();
  }

  addEducationLevel() {
    var educationlevel = {
      name: this.name,
      description: this.description,
    };
    this.educationLevelService.addEducationLevelApi(educationlevel).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: this.name + ' Sucessfully Added!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.educationlevelList$ = this.educationLevelService.getEducationLevelApi();
    });
  }

  updateEducationLevel() {
    var educationlevel = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.educationLevelService.updateEducationLevelApi(id, educationlevel).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: this.name + ' Sucessfully Updated!',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.educationlevelList$ = this.educationLevelService.getEducationLevelApi();
    });
  }
}
