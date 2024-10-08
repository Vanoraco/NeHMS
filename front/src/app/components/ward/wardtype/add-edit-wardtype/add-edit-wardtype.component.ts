import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-wardtype',
  templateUrl: './add-edit-wardtype.component.html',
  styleUrls: ['./add-edit-wardtype.component.css'],
})
export class AddEditWardtypeComponent implements OnInit {
  wardTypeList$!: Observable<any[]>;

  constructor(private bedService: BedService) {}

  @Input() wardType: any;
  id: number = 0;
  name: string = '';
  price: string = '';
  description: string = '';

  ngOnInit(): void {
    this.id = this.wardType.id;
    this.name = this.wardType.name;
    this.price = this.wardType.price;
    this.description = this.wardType.description;
    this.wardTypeList$ = this.bedService.getWardTypeApi();
  }

  addWardType() {
    var wardType = {
      name: this.name,
      price: this.price,
      description: this.description,
    };
    console.log(wardType);
    this.bedService.addWardTypeApi(wardType).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }
  updateWardType() {
    var wardType = {
      id: this.id,
      name: this.name,
      price: this.price,
      description: this.description,
    };
    var id: number = this.id;
    this.bedService.updateWardTypeApi(id, wardType).subscribe((res) => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }
}
