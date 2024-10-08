import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-ward',
  templateUrl: './add-edit-ward.component.html',
  styleUrls: ['./add-edit-ward.component.css'],
})
export class AddEditWardComponent implements OnInit {
  wardList$!: Observable<any[]>;
  bulidingName$: any;
  wardTypes$: any;

  constructor(private wardService: BedService) {}

  @Input() wardList: any;
  id: number = 0;
  name: string = '';
  buildingNumberId: number = 0;
  floorNumber: string = '';
  wardTypeId: number = 0;
  code: number = 0;
  isprivate: string = '';

  ngOnInit(): void {
    this.id = this.wardList.id;
    this.name = this.wardList.name;
    this.code = this.wardList.code;
    this.buildingNumberId = this.wardList.buildingNumberId;
    this.floorNumber = this.wardList.floorNumber;
    this.wardTypeId = this.wardList.wardTypeId;
    this.isprivate = this.wardList.isprivate;

    this.wardList$ = this.wardService.getWardApi();
    this.getBuildingData();
    this.getWardTypeData();
  }
  getBuildingData() {
    this.wardService.getBuildingApi().subscribe((res) => {
      this.bulidingName$ = res;
      console.log(this.bulidingName$);
    });
  }
  getWardTypeData() {
    this.wardService.getWardTypeApi().subscribe((res) => {
      this.wardTypes$ = res;
      console.log(this.wardTypes$);
    });
  }

  addWard() {
    var wardList = {
      name: this.name,
      code: +this.code,
      buildingNumberId: +this.buildingNumberId,
      floorNumber: this.floorNumber,
      wardTypeId: +this.wardTypeId,
      isprivate: this.isprivate == 'true' ? true : false,
    };
    console.log(wardList);
    this.wardService.addWardApi(wardList).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.wardList$ = this.wardService.getWardApi();
    });
  }

  updateWard() {
    var wardList = {
      id: this.id,
      name: this.name,
      code: +this.code,
      buildingNumberId: +this.buildingNumberId,
      floorNumber: this.floorNumber,
      wardTypeId: +this.wardTypeId,
      isprivate: this.isprivate == 'true' ? true : false,
    };
    var id: number = this.id;
    this.wardService.updateWardApi(id, wardList).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.wardList$ = this.wardService.getWardApi();
    });
  }
}
