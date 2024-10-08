import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-available',
  templateUrl: './add-edit-available.component.html',
  styleUrls: ['./add-edit-available.component.css'],
})
export class AddEditAvailableComponent implements OnInit {
  availableList$!: Observable<any[]>;

  constructor(private bedService: BedService) {}

  @Input() availableList: any;
  id: number = 0;
  name: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.availableList.id;
    this.name = this.availableList.name;
    this.description = this.availableList.description;
    this.availableList$ = this.bedService.getAvailableApi();
  }

  addAvailable() {
    var availableList = {
      name: this.name,
      description: this.description,
    };
    console.log(availableList);
    this.bedService.addAvailableApi(availableList).subscribe((res) => {
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
  updateAavailable() {
    var available = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    var id: number = this.id;
    this.bedService.updateAvailableApi(id, available).subscribe((res) => {
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
