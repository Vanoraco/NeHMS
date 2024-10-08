import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { SettingService } from 'src/app/services/setting.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-education-level',
  templateUrl: './education-level.component.html',
  styleUrls: ['./education-level.component.css'],
})
export class EducationLevelComponent implements OnInit {
  educationlevelList$!: Observable<any[]>;

  constructor(private educationLevelService: SettingService, private toast: NgToastService) {}

  ngOnInit(): void {
    this.educationlevelList$ = this.educationLevelService.getEducationLevelApi();
  }

  // Variables (properties)
  modalTitle: string = '';
  activateAddEditEducationlevelComponent: boolean = false;
  educationlevel: any;
  fileName = 'edu_level.xlsx';
  modalAdd() {
    this.educationlevel = {
      id: 0,
      Name: null,
      Description: null,
    };
    this.modalTitle = 'Add Education Level';
    this.activateAddEditEducationlevelComponent = true;
  }

  modalEdit(item: any) {
    this.educationlevel = item;
    this.modalTitle = 'Edit Education Level';
    this.activateAddEditEducationlevelComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete education level ${item.id}`)) {
      this.educationLevelService.deleteEducationLevelApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: item.name + ' Sucessfully Deleted!',
          duration: 4000,
        });
        this.educationlevelList$ = this.educationLevelService.getEducationLevelApi();
      });
    }
  }

  modalClose() {
    this.activateAddEditEducationlevelComponent = false;
    this.educationlevelList$ = this.educationLevelService.getEducationLevelApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('edu-level-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
