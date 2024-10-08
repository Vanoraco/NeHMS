import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingService } from 'src/app/services/setting.service';
@Component({
  selector: 'app-add-edit-tax-rule',
  templateUrl: './add-edit-tax-rule.component.html',
  styleUrls: ['./add-edit-tax-rule.component.css'],
})
export class AddEditTaxRuleComponent implements OnInit {
  taxRulesList$!: Observable<any[]>;
  constructor(private taxRulesService: SettingService) {}
  @Input() taxRulesList: any;
  id: number = 0;
  fromSalary: number = 0;
  toSalary: number = 0;
  percentageAmount: number = 0;
  deduction: number = 0;
  ngOnInit(): void {
    this.taxRulesList$ = this.taxRulesService.getTaxRuleApi();
    this.id = this.taxRulesList.id;
    this.fromSalary = this.taxRulesList.fromSalary;
    this.toSalary = this.taxRulesList.toSalary;
    this.percentageAmount = this.taxRulesList.percentageAmount;
    this.deduction = this.taxRulesList.deduction;
  }
  addTaxRules() {
    var taxRulesList = {
      fromSalary: +this.fromSalary,
      toSalary: +this.toSalary,
      percentageAmount: +this.percentageAmount,
      deduction: +this.deduction,
    };
    console.log(taxRulesList);
    this.taxRulesService.addTaxRuleApi(taxRulesList).subscribe((res) => {
      var closeModalBtn = document.getElementById('modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.taxRulesList$ = this.taxRulesService.getTaxRuleApi();
    });
  }
  updateTaxRules() {
    var taxrules = {
      id: this.id,
      fromSalary: +this.fromSalary,
      toSalary: +this.toSalary,
      percentageAmount: +this.percentageAmount,
      deduction: +this.deduction,
    };
    var id: number = this.id;
    this.taxRulesService.updateTaxRuleApi(id, taxrules).subscribe((res) => {
      var closeModalBtn = document.getElementById('modal-close');
      if (closeModalBtn) {
        closeModalBtn.click();
      }
      this.taxRulesList$ = this.taxRulesService.getTaxRuleApi();
    });
  }
}
