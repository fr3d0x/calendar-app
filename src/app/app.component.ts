import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  public date = moment();

  public days;

  public wdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  constructor() {}

  ngOnInit() {
    this.days = this.setMonthDates(this.date);
    console.log(this.days);
  }

  public setMonthDates(date) {
    const firstDay = moment(date).startOf('M');
    const days = Array.apply(null, { length: date.daysInMonth() })
      .map(Number.call, Number)
      .map(n => {
        return moment(firstDay).add(n, 'd');
      });

    for (let n = 0; n < firstDay.weekday(); n++) {
      days.unshift(null);
    }
    return days;
  }

  public isWeekend(day) {
    return day === 0 || day === 6;
  }
}
