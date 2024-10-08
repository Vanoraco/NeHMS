import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from 'src/app/model/employeemodel';
import { BedService } from 'src/app/services/bed.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css'],
})
export class RoomComponent implements OnInit {
  roomList$: any;
  buildingData$: any;

  // Map to display data associate with foreign keys
  buildingNameMap: Map<number, string> = new Map();

  // Variables (properties)
  modalTitle: string = '';
  activateRoomComponent: boolean = false;
  roomList: any;

  searchName: string = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'room.xlsx';
  constructor(private bedService: BedService) {}

  ngOnInit(): void {
    this.getRoomList();
    this.getBuildingNameMap();
  }

  getRoomList() {
    this.bedService.getRoomApi().subscribe((response) => {
      this.roomList$ = response;
    });
  }

  getBuildingNameMap() {
    this.bedService.getBuildingApi().subscribe((data) => {
      this.buildingData$ = data;
      for (let index = 0; index < data.length; index++) {
        this.buildingNameMap.set(
          this.buildingData$[index].id,
          this.buildingData$[index].name
        );
      }
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getRoomList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getRoomList();
  }

  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.roomList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }

  modalAdd() {
    this.roomList = {
      id: 0,
      name: null,
      buildingId: null,
      floorNumber: 0,
      code: 0,
      admissionId: null,
      descrption: null,
    };
    this.modalTitle = 'Add Room';
    this.activateRoomComponent = true;
  }

  modalEdit(item: any) {
    this.roomList = item;
    this.modalTitle = 'Edit Room';
    this.activateRoomComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete room ${item.id}`)) {
      this.bedService.deleteRoomApi(item.id).subscribe((res) => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.roomList$ = this.bedService.getRoomApi();
      });
    }
  }
  modalClose() {
    this.activateRoomComponent = false;
    this.roomList$ = this.bedService.getRoomApi();
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('room-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
