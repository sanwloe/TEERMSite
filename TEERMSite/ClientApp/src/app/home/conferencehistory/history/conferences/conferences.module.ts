import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../../../../transloco-root.module';
import { FirstconferenceComponent } from './firstconference/firstconference.component';
import { SecondconferenceComponent } from './secondconference/secondconference.component';
import { ThirdconferenceComponent } from './thirdconference/thirdconference.component';
import { FourthconferenceComponent } from './fourthconference/fourthconference.component';
import { FifthconferenceComponent } from './fifthconference/fifthconference.component';
import { SixthconferenceComponent } from './sixthconference/sixthconference.component';
import { SeventhconferenceComponent } from './seventhconference/seventhconference.component';
import { EigthconferenceComponent } from './eigthconference/eigthconference.component';
import { NinthconferenceComponent } from './ninthconference/ninthconference.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ConferencehistoryComponent } from '../../conferencehistory.component';
import { HistoryComponent } from '../history.component';
import { FundersComponent } from '../../funders/funders.component';


const routes: Routes =
  [
    {
      path: 'index', component: HomeComponent, children: [
        {
          path: 'conference-history', component: ConferencehistoryComponent, children:
            [
              {
                path: 'history', component: HistoryComponent, children: [
                  { path: 'first-conference', component: FirstconferenceComponent },
                  { path: 'second-conference',component : SecondconferenceComponent },
                  { path: 'third-conference',component : ThirdconferenceComponent },
                  { path: 'fourth-conference',component : FourthconferenceComponent },
                  { path: 'fifth-conference',component : FifthconferenceComponent },
                  { path: 'sixth-conference',component : SixthconferenceComponent },
                  { path: 'seventh-conference',component : SeventhconferenceComponent }
                ]
              }]
        },
      ]
    }
  ]
@NgModule({
  declarations: [
    FirstconferenceComponent,
    SecondconferenceComponent,
    ThirdconferenceComponent,
    FourthconferenceComponent,
    FifthconferenceComponent,
    SixthconferenceComponent,
    SeventhconferenceComponent,
    EigthconferenceComponent,
    NinthconferenceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslocoRootModule
  ],
  exports: [
    RouterModule,]
})
export class ConferencesHistoryModule { }