import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalsettings',
  templateUrl: './globalsettings.component.html',
  styleUrls: ['./globalsettings.component.scss']
})
export class GlobalsettingsComponent implements OnInit {

  navLeft: any[];
  navRight: any[];
  public redirect: boolean = true;
  public loading: boolean = false;
  public buttontext: string = 'save';

  constructor() { }

  ngOnInit() {
    this.navLeft = ['consumerlist'];
    this.navRight = [];
    let storageRedirect = JSON.parse(localStorage.getItem('redirectAfterBuy'));
    if (storageRedirect !== null) {
        this.redirect = storageRedirect;
    }
  }

  saveSettings() {
    this.loading = true;
    this.buttontext = 'saving...';
    localStorage.setItem('redirectAfterBuy', this.redirect.toString())
    setTimeout(()=>{
      this.loading = false;
      this.buttontext = 'save';
    }, 1000)
  }

}
