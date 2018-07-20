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

  public months;

  public wdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  constructor() {}

  ngOnInit() {
  }

  public generateCalendar(stringDate, numberOfDays) {
    const date = moment(stringDate.value, 'l');
    this.setDates(date, numberOfDays.value);
  }

  public setDates(date, numberOfDays) {
    const firstDay = moment(date);
    let currentMonth = {
      name: this.getMonth(firstDay),
      days: []
    };
    const months = [];
    for (let n = 0; n < numberOfDays; n++) {
      const newDate = moment(firstDay).add(n, 'd');
      const newMonthName = this.getMonth(newDate);
      if (currentMonth.name !== newMonthName) {
        months.push(currentMonth);
        currentMonth = {
          name: newMonthName,
          days: []
        };
      }
      currentMonth.days.push(newDate);
      if (n === numberOfDays - 1) {
        if (!this.isInMonths(newMonthName, months)) {
          months.push(currentMonth);
        }
      }
    }

    months.forEach(month => {
      const firstWeekDay = month.days[0].weekday();
      for (let n = 0; n < firstWeekDay; n++) {
        month.days.unshift(null);
      }
    });
    this.months = months;
  }

  public isWeekend(day) {
    return day === 0 || day === 6;
  }

  private getMonth(date) {
    return date.format('MMMM') + ' ' + date.format('YYYY');
  }

  private isInMonths(monthName, months) {
    months.forEach(month => {
      if (monthName === month.name) {
        return true;
      }
    });
  }
}
