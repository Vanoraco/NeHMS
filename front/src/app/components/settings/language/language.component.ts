import { Component, OnInit } from '@angular/core';
import { BedService } from 'src/app/services/bed.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  bedList: any = [];
  bedTypeList: any = [];
  minutes = 0;
  gender = 'female';
  fly = true;
  logo = 'https://angular.io/assets/images/logos/angular/angular.png';
  inc(i: number) {
    this.minutes = Math.min(5, Math.max(0, this.minutes + i));
  }
  male() { this.gender = 'male'; }
  female() { this.gender = 'female'; }
  other() { this.gender = 'other'; }
  constructor(private bedService: BedService) {}
  ngOnInit(): void {
    this.bedService.getBedApi().subscribe((res) => {
      this.bedList = res;
    });
    this.bedService.getBedTypeApi().subscribe((res) => {
      this.bedTypeList = res.join(this.bedList);
      console.log(this.bedTypeList);
    });
  }
}
