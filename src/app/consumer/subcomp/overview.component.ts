import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-consumer-overview',
  templateUrl: './consumeroverview.html'
})
export class OverviewComponent implements OnInit {
  @Input() consumer: any;
  @Input() purchases: any[];
  @Input() deposits: any[];
  @Input() products: any[];
  public showDeposits: boolean = true;
  public showPurchases: boolean = true;
  public purchaseChart;
  public creditChart;

  constructor() { }

  minDate(array) {
    return array.reduce(function (a, b) { return a < b ? a : b; });
  }

  generateCreditChart() {
    let transactions = [];
    let purchaseDates = this.purchases.map(i => new Date(i.timestamp));
    let depositDates = this.deposits.map(i => new Date(i.timestamp));
    let dates = [
      this.minDate(purchaseDates),
      this.minDate(depositDates)
    ];

    let start_date = moment(this.minDate(dates));
    let now = moment(new Date());

    var tmpDate = start_date;
    while (tmpDate.isSameOrBefore(now, 'day')) {
      let index = transactions.find(i => i.date == tmpDate.format('DD.MM.YYYY'));
      if (typeof index === 'undefined') {
        transactions.push({
          date: tmpDate.format('DD.MM.YYYY'),
          transactions: []
        })
      }
      tmpDate = tmpDate.add(1, 'days');
    }

    if (this.showPurchases) {
      for (let purchase of this.purchases) {
        if (purchase.revoked) {
          continue;
        }
        let date = moment(new Date(purchase.timestamp)).format('DD.MM.YYYY');
        let index = transactions.find(i => i.date == date);
        index.transactions.push(-this.purchase_price(purchase));
      }
    }

    if (this.showDeposits) {
      for (let deposit of this.deposits) {
        let date = moment(new Date(deposit.timestamp)).format('DD.MM.YYYY');
        let index = transactions.find(i => i.date == date);
        index.transactions.push(deposit.amount);
      }
    }

    let credit = 0;
    let creditChart = [];
    for (let item of transactions) {
      credit +=  item.transactions.reduce((pv, cv) => pv+cv, 0);
      creditChart.push({
        date: item.date,
        credit: credit
      })
    }
    this.creditChart = {
      data: [{
        data: creditChart.map(i => i.credit / 100),
        label: 'Euro'
      }],
      labels: creditChart.map(i => i.date),
      type: 'line',
      legend: false,
      options: {
        elements: {
          point: {
            radius: 0
          }
        }
      }
    };
  }

  generatePurchaseChart() {
    let purchaseChart = [];

    for (let purchase of this.purchases) {
      let date = moment(new Date(purchase.timestamp)).format('DD.MM.YYYY');
      let index = purchaseChart.find(i => i.date == date);
      if (typeof index === 'undefined') {
        purchaseChart.push({
          date: date,
          count: 1
        })
      } else {
        index.count++;
      }
    }

    this.purchaseChart = {
      data: [{
        data: purchaseChart.map(i => i.count),
        label: 'Purchases',
        steppedLine: true
      }],
      labels: purchaseChart.map(i => i.date),
      type: 'line',
      legend: false,
      options: {
        elements: {
          point: {
            radius: 0
          }
        }
      }
    };
  }

  purchase_price(p, use_amount=true) {
    let base = p.paid_base_price_per_product + p.paid_karma_per_product;
    if (use_amount) {
      return p.amount * base;
    }
    return base;
  }

  creditClass(credit?: number) {
    if (typeof credit === 'undefined') {
      credit = this.consumer.credit;
    }
    if (credit >= 1000) {
      return 'text-success';
    } else if (credit < 1000 && credit >= 0) {
      return 'text-warning';
    }
    return 'text-danger';
  }

  karmaClass(karma?: number) {
    if (typeof karma === 'undefined') {
      karma = this.consumer.karma;
    }

    if (karma >= 12) {
      return 'text-success';
    } else if (karma >= 6) {
      return 'text-warning';
    }
    return 'text-danger';
  }

  extendCreditInformation() {
    let credit = this.consumer.credit;
    if (credit >= 1000) {
      return 'Everything is fine!';
    } else if (credit < 1000 && credit >= 0) {
      return 'Please consider recharging your balance soon.';
    }
    return 'Please pay your debts immediately. Until you do so, your \
            karma will be set to the lowest value!';
  }

  greeting() {
    let thehours = new Date().getHours();

    if (thehours >= 0 && thehours < 6) {
      return 'Good evening'
    } else if (thehours >= 6 && thehours < 12) {
      return 'Good morning'
    } else if (thehours >= 12 && thehours < 17) {
      return 'Good afternoon'
    } else if (thehours >= 17 && thehours < 24) {
      return 'Good evening'
    } else {
      return 'Hello'
    }
  }

  ngOnInit() {
    // Create purchase history chart and credit history chart
    this.generateCreditChart()
    this.generatePurchaseChart()
  }
}
