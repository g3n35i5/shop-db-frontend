import { Component, OnInit, Input } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/consumerlist', title: 'Consumerlist',  icon: 'fa fa-list fa-fw'},
    { path: '/shop', title: 'Shop',  icon:'fa fa-shopping-basket'},
    { path: '/globalsettings', title: 'Global Settings',  icon:'fa fa-cog'},
    { path: '/globalhistory', title: 'Global History',  icon:'fa fa-globe'},
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navLeft: any[];
  @Input() navRight: any[];
  leftmenuItems: any[];
  rightmenuItems: any[];

  constructor() { }

  ngOnInit() {
    this.leftmenuItems = [];
    this.rightmenuItems = [];
    for (let title of this.navLeft[0]) {

      let route = ROUTES.find(i => i.path.slice(1) === title);
        if (typeof route !== 'undefined') {
          this.leftmenuItems.push(route);
        }
    }
    for (let title of this.navRight[0]) {
      let route = ROUTES.find(i => i.path.slice(1) === title);
        if (typeof route !== 'undefined') {
          this.rightmenuItems.push(route);
        }
    }
  }
}
