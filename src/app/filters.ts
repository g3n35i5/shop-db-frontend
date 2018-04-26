import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'firstLetterEqual' })
export class FirstLetterEqual implements PipeTransform {
  transform(items: any[], letter: string): any {
    let valid = [];
    for (let obj of items) {
      if (obj.name[0].toUpperCase() === letter) {
        valid.push(obj);
      }
    }
    return valid;
  }
}

@Pipe({ name: 'customTime' })
export class CustomTime implements PipeTransform {
  transform(input: string, format='HH:MM'): string {
    if (typeof(input) === "undefined" || input === null) {
      return 'unknown'
    }
    let date = moment(new Date(input));
    return date.format(format);
  }
}


@Pipe({ name: 'customDate' })
export class CustomDate implements PipeTransform {
  transform(input: string): string {
    if (typeof(input) === "undefined" || input === null) {
      return 'never'
    }
    let oneDay = 24 * 60 * 60 * 1000;
    let date1 = new Date()
    let date2 = new Date(input)
    let d1 = date1.getDay()
    let d2 = date2.getDay()

    let diffDays = Math.round(Math.abs((date1.getTime() - date2.getTime()) / (oneDay)));
    if (diffDays == 0) {
      return 'Today'
    } else if (diffDays == 1) {
      return 'Yesterday'
    } else if (diffDays < 5) {
      return diffDays + ' days ago'

    } else {
      return moment(date2).format('DD.MM.YYYY')
    }
  }
}

@Pipe({ name: 'customCurrency' })
export class CustomCurrency implements PipeTransform {
  transform(input: number): number {
    if (typeof(input) === "undefined" || input === null) {
      return null;
    }
    return input / 100;
  }
}
