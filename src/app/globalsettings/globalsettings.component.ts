import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalsettings',
  templateUrl: './globalsettings.component.html',
  styleUrls: ['./globalsettings.component.scss']
})
export class GlobalsettingsComponent implements OnInit {

  navLeft: any[];
  navRight: any[];

  constructor() { }

  ngOnInit() {
    this.navLeft = ['consumerlist'];
    this.navRight = [];
  }

}
