import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data';
import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-consumerlist',
  templateUrl: './consumerlist.component.html',
  styleUrls: ['./consumerlist.component.scss']
})
export class ConsumerlistComponent implements OnInit {

  navLeft: any[];
  navRight: any[];
  public loading: boolean = true;
  public consumers;
  public letters: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.navLeft = ['globalhistory'];
    this.navRight = ['globalsettings'];
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
  }


}
