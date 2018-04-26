import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";
import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { ScrollToService } from 'ng2-scroll-to-el';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  private id: number;
  public navLeft: any[];
  public navRight: any[];
  public categories: any[] = [];
  public productsearch: string;
  public cart: any[] = [];
  public categoryOffset: number = 55;
  public cartOffset: number = 100;
  public loading: boolean = true;
  public showCart: boolean = false;
  public disableInteraction: boolean = false;
  private scrollToTopOffset: number = 180;
  public showScrollTop: boolean = false;
  public consumer;
  public products;
  public departments;
  public favorites;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
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
    this.loading = true;
    this.navLeft = [];
    this.navLeft = [
      {
        path: '/consumerlist', title: 'Consumerlist',  icon:'fa fa-list fa-fw'
      }
    ];
    this.navRight = [];
    this.route.params.subscribe(params => {
       this.id = +params['id'];
       let con = this.dataService.getConsumer(this.id);
       let prod = this.dataService.getProducts();
       let fav = this.dataService.getConsumerFavorites(this.id);
       let dep = this.dataService.getDepartments();
       forkJoin([con, prod, fav, dep]).subscribe(results => {
         this.consumer = results[0];
         this.products = results[1];
         this.favorites = results[2]
         this.departments = results[3];
         this.processingData()
       });
    });
  }

  productClass(product) {
    return product.stock > 0 || !product.countable ? '' : 'grayimage';
  }

  changeCategory(category) {
    for (let category of this.categories) {
      category.active = false;
    }
    let cat = this.categories.find(c => c.title === category.title);
    cat.active = true;
  }

  productFilter(products) {
    let search = this.productsearch;
    if (typeof search !== 'undefined' && search !== '') {
      let res = this.products.filter(i => i.name.includes(this.productsearch));
      return this.sortProducts(res);
    }
    let active = this.categories.find(i => i.active);
    if (active.category === 'favorites') {
      return this.favorites;
    }
    let res = this.products.filter(i => i.department_id === active.category);
    return this.sortProducts(res);
  }

  sortProducts(products) {
    let p1 = [];
    let p2 = [];
    for (let product of products) {
      if (product.stock <= 0) {
        if (product.countable) {
          p2.push(product)
        } else {
          p1.push(product)
        }
      } else {
        p1.push(product)
      }
    }

    p1.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });
    p2.sort(function(a, b) {
      return a.name.localeCompare(b.name);
    });

    return p1.concat(p2);
  }

  processingData() {

    this.categories.push(
      {
        title: 'Favorites',
        category: 'favorites',
        active: true
      }
    )

    for (let department of this.departments) {
      let title = department.name.replace('wart', '');
      this.categories.push(
        {
          title: title,
          category: department.id,
          active: false
        }
      )
    }

    this.products = this.sortProducts(this.products);

    let favorite_ids = this.favorites.map((f) => f.product_id);
    this.favorites = [];
    for (let id of favorite_ids) {
      let product = this.products.find(i => i.id === id);
      this.favorites.push(product);
    }
    this.loading = false;
  }

  imageUrl(name) {
    return this.dataService.apiurl + 'images/' + name;
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
