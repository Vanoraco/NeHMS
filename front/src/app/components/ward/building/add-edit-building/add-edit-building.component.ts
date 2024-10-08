import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-building',
  templateUrl: './add-edit-building.component.html',
  styleUrls: ['./add-edit-building.component.css'],
})
export class AddEditBuildingComponent implements OnInit {
  buildingList$!: Observable<any[]>;

  constructor(private bedService: BedService) {}

  @Input() building: any;
  id: number = 0;
  name: string = '';
  code: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.id = this.building.id;
    this.name = this.building.name;
    this.code = this.building.code;
    this.description = this.building.description;
    this.buildingList$ = this.bedService.getBuildingApi();
  }

  addBuilding() {
    var building = {
      name: this.name,
      code: +this.code,
      description: this.description,
    };
    console.log(building);
    this.bedService.addBuildingApi(building).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if (showAddSuccess) {
        showAddSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showAddSuccess) {
          showAddSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }

  updateBuilding() {
    var building = {
      id: this.id,
      name: this.name,
      code: +this.code,
      description: this.description,
    };
    var id: number = this.id;
    this.bedService.updateBuildingApi(id, building).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if (showUpdateSuccess) {
        showUpdateSuccess.style.display = 'block';
      }
      setTimeout(function () {
        if (showUpdateSuccess) {
          showUpdateSuccess.style.display = 'none';
        }
      }, 4000);
    });
  }
}
