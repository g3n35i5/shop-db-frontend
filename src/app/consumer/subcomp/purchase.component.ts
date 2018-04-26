import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import * as moment from 'moment';
import { DataService } from '../../services/data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consumer-purchases',
  templateUrl: './consumerpurchases.html'
})

export class PurchaseComponent implements OnInit {
  @Input() purchases: any;
  @Input() products: any;
  @Output() update = new EventEmitter();
  public disableInteraction: boolean = false;

  constructor(
    private dataService: DataService,
    private toastr: ToastrService
  ) { }

  revoke(purchase) {
    this.disableInteraction = true;
    this.dataService.revokePurchase(purchase).subscribe(response => {
      if (response['result'] === 'updated') {
        console.log("Fetching Purchases")
        this.dataService.getConsumerPurchases(purchase.consumer_id)
        .subscribe(result => {
          this.purchases = result;
          this.process_purchases();
          this.toastr.success('Purchase revoked!', 'Success');
          this.disableInteraction = false;
        })
      } else {
        this.toastr.error('Could not revoke purchase!', 'Error');
      }
    })
  }

  process_purchases() {
    for (let purchase of this.purchases) {
      let product = this.products.find(i => i.id === purchase.product_id);;
      purchase.product = product;
      purchase.price = this.purchase_price(purchase, false);
      purchase.sum = this.purchase_price(purchase);
    }
  }

  purchase_price(p, use_amount=true) {
    let base = p.paid_base_price_per_product + p.paid_karma_per_product;
    if (use_amount) {
      return p.amount * base;
    }
    return base;
  }

  ngOnInit() {
    this.process_purchases();
  }
}
