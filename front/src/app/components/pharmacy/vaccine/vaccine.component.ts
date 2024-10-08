import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { PharmacyService } from 'src/app/services/pharmacy.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-vaccine',
  templateUrl: './vaccine.component.html',
  styleUrls: ['./vaccine.component.css'],
})
export class VaccineComponent implements OnInit {
  VaccineList$: any =[];
  constructor(
    private VaccineService: PharmacyService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getVaccineList();
  }

  getVaccineList(){
    this.VaccineService.getVaccineApi().subscribe(res=>{
      this.VaccineList$ = res;
    })
  }

  // Variables (properties)
  modalTitle: string = '';
  activateVaccineComponent: boolean = false;
  Vaccines: any;
  //search
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'vaccine.xlsx';
  modalAdd() {
    this.Vaccines = {
      id:0,
      name: null,
      description: null,
    };
    this.modalTitle = 'Add Vaccine';
    this.activateVaccineComponent = true;
  }

  modalEdit(item: any) {
    this.Vaccines = item;
    this.modalTitle = 'Edit Vaccine';
    this.activateVaccineComponent = true;
  }

  delete(item: any) {
    if (confirm(`Are you sure you want to delete Vaccine ${item.id}`)) {
      this.VaccineService.deleteVaccineApi(item.id).subscribe((res) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Sucessfully Deleted!',
          duration: 4000,
        });
        var closeModalBtn = document.getElementById('add-edit-modal-close');
        if (closeModalBtn) {
          closeModalBtn.click();
        }
        this.VaccineList$ = this.VaccineService.getVaccineApi();
      });
    }
  }
  modalClose() {
    this.activateVaccineComponent = false;
    this.VaccineList$ = this.VaccineService.getVaccineApi();
  }
  
  onTableDataChange(event: any) {
    this.page = event;
    this.getVaccineList();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getVaccineList();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.VaccineList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    key = this.key;
    this.reverse = !this.reverse;
  }exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('vaccine-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
