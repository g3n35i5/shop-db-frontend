import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConsumerlistComponent } from './consumerlist/consumerlist.component';
import { GlobalsettingsComponent } from './globalsettings/globalsettings.component';
import { GlobalhistoryComponent } from './globalhistory/globalhistory.component';

const appRoutes: Routes = [
  {path: 'consumerlist', component: ConsumerlistComponent},
  {path: 'globalsettings', component: GlobalsettingsComponent},
  {path: 'globalhistory', component: GlobalhistoryComponent},
  { path: '',
    redirectTo: '/consumerlist',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConsumerlistComponent,
    GlobalsettingsComponent,
    GlobalhistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
