import { DatePipe } from '@angular/common';

export interface TableData {
  id: String;
  name: String;
  position: String;
  age: String;
  start_date: String;
}

export class CustomDatePipe {
  constructor(private datePipe: DatePipe) {}
  getDatePipe(element: any) {
    const formattedDate = this.datePipe.transform(element, 'MMMM');
    console.log(formattedDate);
  }
}
