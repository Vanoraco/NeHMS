import { Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { SettingService } from 'src/app/services/setting.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-tax-rule',
  templateUrl: './tax-rule.component.html',
  styleUrls: ['./tax-rule.component.css'],
})
export class TaxRuleComponent implements OnInit {
  taxRulesList$: any = [];
  searchName: string = '';
  //sort
  key: string = 'id';
  reverse: boolean = false;
  //pagination
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  fileName = 'tax-rule.xlsx';
  constructor(
    private taxRulesService: SettingService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getTaxRule();
  }
  modalTitle: string = '';
  activateTaxRulesComponent: boolean = false;
  taxRulesList: any;
  getTaxRule() {
    this.taxRulesService.getTaxRuleApi().subscribe((response) => {
      this.taxRulesList$ = response;
    });
  }
  modalAdd() {
    this.taxRulesList = {
      id: 0,
      name: null,
      description: null,
    };
    this.modalTitle = 'Add tax rules';
    this.activateTaxRulesComponent = true;
  }

  modalEdit(item: any) {
    this.taxRulesList = item;
    this.modalTitle = 'Edit tax rules';
    this.activateTaxRulesComponent = true;
  }
  delete(item: any) {
    if (confirm(`Are you sure you want to delete tax rules ${item.id}`)) {
      this.taxRulesService
        .deleteTaxRuleApi(item.id)
        .subscribe((res) => {
          this.toast.success({
            detail: 'SUCCESS',
            summary: ' Sucessfully Deleted!',
            duration: 4000,
          });
          var closeModalBtn = document.getElementById('modal-close');
          if (closeModalBtn) {
            closeModalBtn.click();
          }
          this.getTaxRule();
        });
    }
  }
  modalClose() {
    this.activateTaxRulesComponent = false;
    //
    this.getTaxRule();
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getTaxRule();
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getTaxRule();
  }
  searchByName() {
    if (this.searchName == '') {
      this.ngOnInit();
    } else {
      this.taxRulesList$.filter((res: any) => {
        return res.searchName
          .toLocaleLowerCase()
          .match(res.searchName.toLocaleLowerCase());
      });
    }
  }
  sort(key: any) {
    this.reverse = !this.reverse;
    let direction = this.reverse ? 1 : -1;
    this.taxRulesList.sort(
      (a: { [x: string]: number }, b: { [x: string]: number }) => {
        if (a[key] < b[key]) {
          return -1 * direction;
        } else if (a[key] < b[key]) {
          return 1 * direction;
        } else {
          return 0;
        }
      }
    );
  }
  exportToExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('tax-rule-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
