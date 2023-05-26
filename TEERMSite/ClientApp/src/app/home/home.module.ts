import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoRootModule } from '../transloco-root.module';


import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from '../home/home.component';
import { ImportantdatesComponent } from './importantdates/importantdates.component';
import { ConferenceprogramComponent } from './conferenceprogram/conferenceprogram.component';
import { InformationPartnersComponent } from './information-partners/information-partners.component';
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
import { FormsModule } from '@angular/forms';
import { ContributionComponent } from './contribution/contribution.component';
import { AuthGuard } from '../auth/auth.guard';



const routes : Routes=[
    {
        path : 'index', component : HomeComponent,
        children:
        [
            { path : '', component : MainComponent},
            { path : 'important-dates', component : ImportantdatesComponent },
            { path : 'conference-program',component : ConferenceprogramComponent },
            { path : 'info-partners',component : InformationPartnersComponent},
            { path : 'thematic-directions',component : ThematicdirectionsComponent},
            { path : 'organizational-committee',component : OrganizationalcommitteeComponent },
            { path : 'requirements-theses',component : RequirementsthesesComponent},
            { path : 'management-team',component : ManagementTeamComponent },
            { path : 'program-comittee',component : ProgramcomitteeComponent},
            { path : 'pay-info',component : ContributionComponent }
        ]
    }
]
@NgModule({
  declarations: [
    NavMenuComponent,
    ImportantdatesComponent,
    ConferenceprogramComponent,
    InformationPartnersComponent,
    ThematicdirectionsComponent,
    OrganizationalcommitteeComponent,
    SocialnetworksComponent,
    HomeComponent,
    MainComponent,
    ConferencehistoryComponent,
    RequirementsthesesComponent,
    ManagementTeamComponent,
    ProgramcomitteeComponent,
    ContributionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslocoRootModule
  ],
  exports : [RouterModule],
  providers: [DataService]
  
})
export class HomeModule { }