import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumerlist',
  templateUrl: './consumerlist.component.html',
  styleUrls: ['./consumerlist.component.scss']
})
export class ConsumerlistComponent implements OnInit {

  navLeft: any[];
  navRight: any[];

  constructor() { }

  ngOnInit() {
    this.navLeft = ['globalhistory'];
    this.navRight = ['globalsettings'];
  }

}
