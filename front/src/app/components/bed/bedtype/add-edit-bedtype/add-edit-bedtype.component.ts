import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-bedtype',
  templateUrl: './add-edit-bedtype.component.html',
  styleUrls: ['./add-edit-bedtype.component.css'],
})
export class AddEditBedtypeComponent implements OnInit {
  bedtypeList$!: Observable<any[]>;

  constructor(private bedService: BedService) {}

  @Input() bedType: any;
  id: number = 0;
  name: string = '';
  price: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.id = this.bedType.id;
    this.name = this.bedType.name;
    this.price = this.bedType.price;
    this.description = this.bedType.description;
    this.bedtypeList$ = this.bedService.getBedTypeApi();
  }

  addBedType() {
    var bedType = {
      name: this.name,
      price: +this.price,
      description: this.description,
    };
    console.log(bedType);
    this.bedService.addBedTypeApi(bedType).subscribe((res) => {
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
  updateBedType() {
    var bedtype = {
      id: this.id,
      name: this.name,
      price: +this.price,
      description: this.description,
    };
    var id: number = this.id;
    this.bedService.updateBedTypeApi(id, bedtype).subscribe((res) => {
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
