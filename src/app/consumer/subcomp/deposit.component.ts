import { Component, OnInit, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';

@Component({
  selector: 'app-consumer-deposits',
  templateUrl: './consumerdeposits.html'
})
export class DepositComponent implements OnInit {
  @Input() deposits: any[];

  constructor() { }


  ngOnInit() {

  }
}
