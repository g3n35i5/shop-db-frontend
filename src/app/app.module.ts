import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsumerlistComponent } from './consumerlist/consumerlist.component';
import { GlobalsettingsComponent } from './globalsettings/globalsettings.component';
import { GlobalhistoryComponent } from './globalhistory/globalhistory.component';
import { ShopComponent } from './shop/shop.component';
import { ConsumerComponent } from './consumer/consumer.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { DataService } from './services/data';

import { ErrorHandler } from './services/error_handler';
import { RequestInterceptor } from './services/http_interceptor';
import { OfflineComponent } from './offline/offline.component';

import { FirstLetterEqual } from './filters';
import { CustomDate } from './filters';
import { CustomCurrency } from './filters';

const appRoutes: Routes = [
  { path: 'consumerlist',                component: ConsumerlistComponent },
  { path: 'globalsettings',              component: GlobalsettingsComponent },
  { path: 'globalhistory',               component: GlobalhistoryComponent },
  { path: 'shop/:id',                    component: ShopComponent },
  { path: 'consumer/:id',                component: ConsumerComponent },
  { path: 'offline',                     component: OfflineComponent },
  { path: '',
    redirectTo: '/consumerlist',
    pathMatch: 'full'
  },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConsumerlistComponent,
    GlobalsettingsComponent,
    GlobalhistoryComponent,
    OfflineComponent,
    FirstLetterEqual,
    CustomDate,
    CustomCurrency,
    ShopComponent,
    PagenotfoundComponent,
    ConsumerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ErrorHandler,
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
