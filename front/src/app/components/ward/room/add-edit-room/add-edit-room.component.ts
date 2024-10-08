import { Component, Input, OnInit } from '@angular/core';
import { NgToastComponent, NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-add-edit-room',
  templateUrl: './add-edit-room.component.html',
  styleUrls: ['./add-edit-room.component.css'],
})
export class AddEditRoomComponent implements OnInit {
  roomList$!: Observable<any[]>;
  bulidingName$!: Observable<any[]>;

  constructor(private bedService: BedService, private toast: NgToastService) {}

  @Input() roomList: any;
  id: number = 0;
  name: string = '';
  code: number = 0;
  buildingId: number = 0;
  floorNumber: number = 0;
  description: string = '';

  ngOnInit(): void {
    this.id = this.roomList.id;
    this.name = this.roomList.name;
    this.code = this.roomList.code;
    this.buildingId = this.roomList.buildingId;
    this.floorNumber = this.roomList.floorNumber;
    this.description = this.roomList.description;

    this.roomList$ = this.bedService.getRoomApi();
    this.bulidingName$ = this.bedService.getBuildingApi();
  }

  addRoom() {
    var roomList = {
      name: this.name,
      code: +this.code,
      buildingId: +this.buildingId,
      floorNumber: +this.floorNumber,
      description: this.description,
    };
    console.log(roomList);
    this.bedService.addRoomApi(roomList).subscribe(
      (res) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: `${roomList.name} Successfully Added!!`,
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
      },
      (err) => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'Something went wrong!!',
          duration: 4000,
        });
      }
    );
  }

  updateRoom() {
    var roomList = {
      id: this.id,
      name: this.name,
      code: +this.code,
      buildingId: +this.buildingId,
      floorNumber: +this.floorNumber,
      description: this.description,
    };
    var id: number = this.id;
    this.bedService.updateRoomApi(id, roomList).subscribe((res) => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: `${roomList.name} Successfully Updated!!`,
        duration: 4000,
      });
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
    });
  }
}
