import { Component, OnInit } from '@angular/core';
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
} from '@syncfusion/ej2-angular-schedule';
@Component({
  selector: 'app-calander',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
  ],
  template: `<ejs-schedule
    [selectedDate]="selectedDate"
    [eventSettings]="eventSettings"
  ></ejs-schedule>`,
})
export class CalanderComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  public data: object[] = [
    {
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2023, 1, 15, 10, 0),
      EndTime: new Date(2023, 1, 15, 12, 30),
    },
  ];
  public selectedDate: Date = new Date(2023, 1, 15);
  public eventSettings: EventSettingsModel = {
    dataSource: this.data,
  };
}
