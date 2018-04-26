import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";
import { ScrollToService } from 'ng2-scroll-to-el';

@Component({
  selector: 'app-consumerlist',
  templateUrl: './consumerlist.component.html',
  styleUrls: ['./consumerlist.component.scss']
})
export class ConsumerlistComponent implements OnInit {

  navLeft: any[];
  navRight: any[];
  private scrollToTopOffset: number = 180;
  public loading: boolean = true;
  public showScrollTop: boolean = false;
  public consumers;
  public letters: any[] = [];

  constructor(
    private dataService: DataService,
    private scrollService: ScrollToService
  ) {}

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      const scrollPosition = window.pageYOffset
      this.showScrollTop = scrollPosition >= this.scrollToTopOffset;
    }

  scrollTo(element, duration=500, offset=0) {
    this.scrollService.scrollTo(element, duration, offset);
  }

  ngOnInit() {
    this.navLeft = [
      {
        path: '/globalhistory', title: 'Global History',  icon:'fa fa-globe'
      }
    ];
    this.navRight = [
      {
        path: '/globalsettings', title: 'Global Settings',  icon:'fa fa-cog'
      }
    ];
    let con = this.dataService.getConsumers();
    forkJoin([con]).subscribe(results => {
      this.consumers = results[0];
      this.processingData()
    });
  }

  processingData() {
    // get all first letters
    for (let consumer of this.consumers) {
      let letter = consumer.name[0].toUpperCase();
      let index = this.letters.find(function(element) {
        return element == letter;
      });
      if (typeof index === 'undefined') {
        this.letters.push(letter);
      }
    }
    this.letters.sort();
    this.loading = false;
    this.scrollTo("top", 100, 0);
  }
}
