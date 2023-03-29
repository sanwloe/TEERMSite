import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../../transloco-root.module';
import { HistoryComponent } from './history/history.component';
import { FundersComponent } from './funders/funders.component';
import { HomeComponent } from '../home.component';
import { ConferencehistoryComponent } from './conferencehistory.component';

const routes : Routes=
[
  {
    path : 'conferencehistory',component : ConferencehistoryComponent,
  }    
]
@NgModule({
  declarations: [
    HistoryComponent,
    FundersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoRootModule
  ],
  exports : [
    RouterModule,
    HistoryComponent,
    FundersComponent],
})
export class ConferenceHistoryModule { }