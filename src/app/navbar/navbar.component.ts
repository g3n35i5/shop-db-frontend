import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() navLeft: any[];
  @Input() navRight: any[];

  constructor() { }

  ngOnInit() {

  }
}
