import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../transloco-root.module';


import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from '../home/home.component';
import { ImportantdatesComponent } from './importantdates/importantdates.component';
import { ConferenceprogramComponent } from './conferenceprogram/conferenceprogram.component';
import { PublicationrequierementsComponent } from './publicationrequierements/publicationrequierements.component';
import { ThematicdirectionsComponent } from './thematicdirections/thematicdirections.component';
import { OrganizationalcommitteeComponent } from './organizationalcommittee/organizationalcommittee.component';
import { MainComponent } from './main/main.component';
import { SocialnetworksComponent } from './socialnetworks/socialnetworks.component';
import { DataService } from './DataService';
import { ConferencehistoryComponent } from './conferencehistory/conferencehistory.component';
import { ConferenceHistoryModule } from './conferencehistory/conference.module';
import { HistoryComponent } from './conferencehistory/history/history.component';
import { FundersComponent } from './conferencehistory/funders/funders.component';
import { RequirementsthesesComponent } from './requirementstheses/requirementstheses.component';
import { ManagementTeamComponent } from './management-team/management-team.component';
import { ProgramcomitteeComponent } from './programcomittee/programcomittee.component';



const routes : Routes=[
    {
        path : 'index', component : HomeComponent,
        children:
        [
            { path : '', component : MainComponent},
            { path : 'importantdates', component : ImportantdatesComponent },
            { path : 'conferenceprogram',component : ConferenceprogramComponent},
            { path : 'publicationrequirements',component : PublicationrequierementsComponent},
            { path : 'thematicdirections',component : ThematicdirectionsComponent},
            { path : 'organizational-committee',component : OrganizationalcommitteeComponent },
            { path : 'conferencehistory',component : ConferencehistoryComponent,children : [
              { path : 'history',component : HistoryComponent },
              { path : 'funders',component : FundersComponent }
            ] },
            { path : 'requirementstheses',component : RequirementsthesesComponent},
            { path : 'management-team',component : ManagementTeamComponent },
            { path : 'program-comittee',component : ProgramcomitteeComponent},
        ]
    }
]
@NgModule({
  declarations: [
    NavMenuComponent,
    ImportantdatesComponent,
    ConferenceprogramComponent,
    PublicationrequierementsComponent,
    ThematicdirectionsComponent,
    OrganizationalcommitteeComponent,
    SocialnetworksComponent,
    HomeComponent,
    MainComponent,
    ConferencehistoryComponent,
    RequirementsthesesComponent,
    ManagementTeamComponent,
    ProgramcomitteeComponent,
  ],
  imports: [
    CommonModule,
    ConferenceHistoryModule,
    RouterModule.forChild(routes),
    TranslocoRootModule
  ],
  exports : [RouterModule],
  providers: [DataService]
  
})
export class HomeModule { }