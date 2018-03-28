import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalhistory',
  templateUrl: './globalhistory.component.html',
  styleUrls: ['./globalhistory.component.scss']
})
export class GlobalhistoryComponent implements OnInit {

  navLeft: any[];
  navRight: any[];

  constructor() { }

  ngOnInit() {
    this.navLeft = ['consumerlist'];
    this.navRight = ['globalsettings'];
  }

}
