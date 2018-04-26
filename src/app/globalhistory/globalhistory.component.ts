import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-globalhistory',
  templateUrl: './globalhistory.component.html',
  styleUrls: ['./globalhistory.component.scss']
})
export class GlobalhistoryComponent implements OnInit {

  navLeft: any[];
  navRight: any[];
  public loading: boolean = true;
  history;
  consumers;
  products;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loading = true;
    this.navLeft = [
      {
        path: '/consumerlist', title: 'Consumerlist',  icon:'fa fa-list fa-fw'
      }
    ];
    this.navRight = [
      {
        path: '/globalsettings', title: 'Global Settings',  icon:'fa fa-cog fa-fw'
      }
    ];

    let pur = this.dataService.getPurchases(100);
    let con = this.dataService.getConsumers();
    let prod = this.dataService.getProducts();
    forkJoin([pur, con, prod]).subscribe(results => {
      this.history = results[0];
      this.consumers = results[1];
      this.products = results[2];
      this.processingData()
    });
  }

  processingData() {
    for (let purchase of this.history) {
      if (purchase.revoked) {
        this.history = this.history.filter(i => i !== purchase);
      }
      let consumer = this.consumers.find(i => i.id === purchase.consumer_id);
      let product = this.products.find(i => i.id === purchase.product_id);
      purchase.consumer = consumer;
      purchase.product = product;
    }
    this.loading = false;
  }
}
