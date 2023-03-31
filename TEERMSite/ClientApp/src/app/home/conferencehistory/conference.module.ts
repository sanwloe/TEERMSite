import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../../transloco-root.module';
import { HistoryComponent } from './history/history.component';
import { FundersComponent } from './funders/funders.component';
import { HomeComponent } from '../home.component';
import { ConferencehistoryComponent } from './conferencehistory.component';
import { ConferencesHistoryModule } from './history/conferences/conferences.module';

const routes : Routes=
[
    { path : 'index',component : HomeComponent,children : [
        { path : 'conference-history',component : ConferencehistoryComponent,children : [
          { path : 'history',component : HistoryComponent },
          { path : 'funders',component : FundersComponent }
        ]},
        
    ] },
    
     
]
@NgModule({
  declarations: [
    HistoryComponent,
    FundersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoRootModule,
    ConferencesHistoryModule,
  ],
  exports : [
    RouterModule,
    HistoryComponent,
    FundersComponent],
})
export class ConferenceHistoryModule { }