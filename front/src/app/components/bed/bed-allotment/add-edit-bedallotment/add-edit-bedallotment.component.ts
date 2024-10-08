import { Component, Input, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-bedallotment',
  templateUrl: './add-edit-bedallotment.component.html',
  styleUrls: ['./add-edit-bedallotment.component.css'],
})
export class AddEditBedallotmentComponent implements OnInit {
  bedAllotmentList$!: Observable<any[]>;

  patientList$!: Observable<any[]>;

  bedList$!: Observable<any[]>;

  constructor(
    private bedService: BedService,
    private patientService: EmployeeService,
    private toast: NgToastService
  ) {}

  @Input() bedAllotment: any;
  id: number = 0;
  bedId: number = 0;
  patientId: number = 0;
  allotedDate: string = '';
  discourageDate: string = '';

  ngOnInit(): void {
    this.id = this.bedAllotment.id;
    this.bedId = this.bedAllotment.bedId;
    this.patientId = this.bedAllotment.patientId;
    this.allotedDate = this.bedAllotment.allotedDate;
    this.discourageDate = this.bedAllotment.discourageDate;

    this.bedAllotmentList$ = this.bedService.getBedAllotmentApi();
    this.patientList$ = this.patientService.getPatientApi();
    this.bedList$ = this.bedService.getBedApi();
  }

  addBedAllotment() {
    var bedAllotment = {
      allotedDate: this.allotedDate,
      discourageDate: this.discourageDate,
      patientId: +this.patientId,
      bedId: +this.bedId,
    };
    console.log(bedAllotment);
    this.bedService.addBedAllotmentApi(bedAllotment).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Successfully Added!! ',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.bedAllotmentList$ = this.bedService.getBedAllotmentApi();
    });
  }

  updateBedAllotment() {
    var bedAllotment = {
      id: this.id,
      allotedDate: this.allotedDate,
      discourageDate: this.discourageDate,
      patientId: this.patientId,
      bedId: this.bedId,
    };
    var id: number = this.id;
    this.bedService.updateBedAllotmentApi(id, bedAllotment).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Successfully Updated!! ',
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.bedAllotmentList$ = this.bedService.getBedAllotmentApi();
    });
  }

  getOptions(isFilter: boolean) {
    return {
      enableFiltering: isFilter,
      enableCaseInsensitiveFiltering: isFilter,
      filterPlaceholder: 'Search ...',
      nonSelectedText: 'Check an option!',
      numberDisplayed: 1,
      maxHeight: 400,
    };
  }
  //   $('#DDLState').multiselect(getOptions(true));
  // $('#DDLCity').multiselect(getOptions());
}
