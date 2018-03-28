import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.scss']
})
export class ConsumerComponent implements OnInit {
  private id: number;
  public navLeft: any[];
  public navRight: any[];
  public loading: boolean = true;
  public consumer;
  public purchases;
  public deposits;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.navLeft = [];
    this.navRight = ['consumerlist'];
    this.route.params.subscribe(params => {
       this.id = +params['id'];
       let con = this.dataService.getConsumer(this.id);
       let pur = this.dataService.getConsumerPurchases(this.id);
       let dep = this.dataService.getConsumerDeposits(this.id);
       forkJoin([con, pur, dep]).subscribe(results => {
         this.consumer = results[0];
         this.purchases = results[1];
         this.deposits = results[2];
         this.processingData()
       });
    });
  }

  processingData() {
    this.loading = false;
  }

  creditClass(credit?: number) {
    if (typeof credit === 'undefined') {
      let credit = this.consumer.credit;
    }
    if (credit >= 1000) {
      return 'text-success';
    } else if (credit < 1000 && credit >= 0) {
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
    return "Please pay your debts immediately, in this time \
            your karma will be set to the lowest value!";
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
}
