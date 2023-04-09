import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { TranslocoRootModule } from './transloco-root.module';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './auth/auth.module';
import { AuthComponent } from './auth/auth.component';
import { ConferenceHistoryModule } from './home/conferencehistory/conference.module';
import { ConferencesHistoryModule } from './home/conferencehistory/history/conferences/conferences.module';
import { Error404Component } from './error404/error404.component';
import { AccountComponent } from './account/account.component';
import { AccountModule } from './account/account.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: ''}),
    HttpClientModule,
    FormsModule,
    AuthModule,
    HomeModule,
    ConferenceHistoryModule,
    ConferencesHistoryModule,
    AccountModule,
    RouterModule.forRoot([
      { path: 'index', component : HomeComponent },
      { path: 'auth',component : AuthComponent },
      { path: '' ,redirectTo : '/index',pathMatch : 'full' },
      { path: '**',component : Error404Component }
  ]),
    TranslocoRootModule
  ],
  exports : [RouterModule,TranslocoRootModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
