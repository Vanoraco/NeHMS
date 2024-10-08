import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-bed',
  templateUrl: './add-edit-bed.component.html',
  styleUrls: ['./add-edit-bed.component.css'],
})
export class AddEditBedComponent implements OnInit {
  bedList$!: Observable<any[]>;
  wardList$!: Observable<any[]>;
  availableList$!: Observable<any[]>;
  bedTypeList$!: Observable<any[]>;

  constructor(private bedService: BedService) {}

  @Input() bedList: any;
  id: number = 0;
  name: string = '';
  code: number = 0;
  bedTypeId: number = 0;
  wardId: number = 0;
  availableId: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.id = this.bedList.id;
    this.name = this.bedList.name;
    this.code = this.bedList.code;
    this.bedTypeId = this.bedList.bedTypeId;
    this.wardId = this.bedList.wardId;
    this.availableId = this.bedList.availableId;
    this.description = this.bedList.description;

    this.bedList$ = this.bedService.getBedApi();
    this.bedTypeList$ = this.bedService.getBedTypeApi();
    this.wardList$ = this.bedService.getWardApi();
    this.availableList$ = this.bedService.getAvailableApi();
    
  }

  addBed() {
    var bedList = {
      name: this.name,
      code: this.code,
      bedTypeId: +this.bedTypeId,
      wardId: +this.wardId,
      availableId: +this.availableId,
      description: this.description,
    };
    console.log(bedList);
    this.bedService.addBedApi(bedList).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }

  updateBed() {
    var bedList = {
      id: this.id,
      name: this.name,
      code: this.code,
      bedTypeId: +this.bedTypeId,
      wardId: +this.wardId,
      availableId: +this.availableId,
      description: this.description,
    };
    var id: number = this.id;
    this.bedService.updateBedApi(id, bedList).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }

  
}
