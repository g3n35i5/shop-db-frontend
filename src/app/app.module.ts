import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NguiStickyModule } from '@ngui/sticky';
import { ScrollToModule } from 'ng2-scroll-to-el';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PurchaseComponent } from './consumer/subcomp/purchase.component';
import { DepositComponent } from './consumer/subcomp/deposit.component';
import { OverviewComponent } from './consumer/subcomp/overview.component';
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
import { CustomTime } from './filters';
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
    PurchaseComponent,
    DepositComponent,
    OverviewComponent,
    ConsumerlistComponent,
    GlobalsettingsComponent,
    GlobalhistoryComponent,
    OfflineComponent,
    FirstLetterEqual,
    CustomDate,
    CustomTime,
    CustomCurrency,
    ShopComponent,
    PagenotfoundComponent,
    ConsumerComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ChartsModule,
    NguiStickyModule,
    ScrollToModule.forRoot()
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
