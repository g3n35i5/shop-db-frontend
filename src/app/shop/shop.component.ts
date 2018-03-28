import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  private id: number;
  public navLeft: any[];
  public navRight: any[];
  public categories: any[] = ['Food', 'Drinks', 'Coffee', 'Sweets'];
  public cart: any[] = [];
  public loading: boolean = true;
  public showCart: boolean = false;
  public disableInteraction: boolean = false;
  public consumer;
  public products;
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
       let prod = this.dataService.getProducts();
       forkJoin([con, prod]).subscribe(results => {
         this.consumer = results[0];
         this.products = results[1];
         this.processingData()
       });
    });
  }

  processingData() {
    this.loading = false;
  }

  imageUrl(name) {
    return this.dataService.apiurl + 'images/' + name;
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

  cartCreditClass() {
    return this.creditClass(this.consumer.credit - this.basketSum());
  }

  basketSum() {
    let sum = 0;
    for (let item of this.cart) {
      sum += item.amount * item.price;
    }
    return sum;
  }

  cartDelete() {
    this.showCart = false;
    this.cart = [];
  }

  cartBuy() {
    this.disableInteraction = true;
    let all_purchases = [];
    for (let product of this.cart) {
      let data = {
        consumer_id: this.consumer.id,
        product_id: product.id,
        amount: product.amount,
        comment: 'purchase inserted via shop.db frontend'
      }
      all_purchases.push(this.dataService.insertPurchase(data));
    }
    forkJoin(all_purchases).subscribe(res => {
      let consumer = this.dataService.getConsumer(this.id);
      forkJoin([consumer]).subscribe(res => {
        this.consumer = res[0];
      });
      this.disableInteraction = false;
      this.cart = [];
      this.showCart = false;
    });
  }

  increase(product) {
    let item = this.cart.find(i => i.id === product.id);
    item.amount ++;
  }

  decrease(product) {
    let item = this.cart.find(i => i.id === product.id);
    if (item.amount > 1) {
      item.amount --;
    } else {
      this.cart = this.cart.filter(obj => obj !== item);
    }
    if (this.cart.length === 0) {
      this.showCart = false;
    }
  }

  addToCart(product) {
    this.showCart = true;
    let index = this.cart.find(i => i.id === product.id);
    if (typeof index === 'undefined') {
      product.amount = 1;
      this.cart.push(product);
    } else {
      index.amount ++;
    }
  }

}
