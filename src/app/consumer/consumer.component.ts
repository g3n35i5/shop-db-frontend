import { Component, OnInit, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";
import { CurrencyPipe } from '@angular/common';
import { ScrollToService } from 'ng2-scroll-to-el';
import * as moment from 'moment';

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
  public showDeposits: boolean = true;
  public showPurchases: boolean = true;
  public consumerlinks: any[];
  private scrollToTopOffset: number = 180;
  public showScrollTop: boolean = false;
  public purchaseChart;
  public creditChart;
  public consumer;
  public products;
  public purchases;
  public deposits;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private elementRef: ElementRef,
    private scrollService: ScrollToService
  ) { }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const scrollPosition = window.pageYOffset
      this.showScrollTop = scrollPosition >= this.scrollToTopOffset;
    }

  scrollTo(element, duration=500, offset=0) {
    this.scrollService.scrollTo(element, duration, offset);
  }

  ngOnInit() {
    this.consumerlinks = [
      {
        name: 'Overview',
        active: true
      },
      {
        name: 'Purchases',
        active: false
      },
      {
        name: 'Deposits',
        active: false
      }
    ]
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      let con = this.dataService.getConsumer(this.id);
      let pur = this.dataService.getConsumerPurchases(this.id);
      let dep = this.dataService.getConsumerDeposits(this.id);
      let prod = this.dataService.getProducts();
      forkJoin([con, pur, dep, prod]).subscribe(results => {
        this.consumer = results[0];
        this.purchases = results[1];
        this.deposits = results[2];
        this.products = results[3];
        this.processingData()
      });
    });
    this.navLeft = [
      {
        path: '/shop/' + this.id.toString(),
        title: 'Shop',
        icon:'fa fa-shopping-cart fa-fw'
      }
    ];
    this.navRight = [
      {
        path: '/consumerlist',
        title: 'Consumerlist',
        icon:'fa fa-list fa-fw'
      }
    ];
  }

  processingData() {
    // Set loading to false and show the frontend
    this.loading = false
  }


}
