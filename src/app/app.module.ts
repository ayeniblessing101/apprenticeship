// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AngularFireModule } from 'angularfire2';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { SelectModule } from 'ng-select';
import { AccordionModule } from 'ngx-accordion';
import { MomentModule } from 'angular2-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { SkillService } from './services/skill.service';
import { RequestService } from './services/request.service';
import { NotificationService } from './services/notifications.service';
import { FilterService } from './services/filter.service';
import { HttpService } from './services/http.service';
import { HelperService } from './services/helper.service';
import { UserService } from './services/user.service';
import { SessionService } from './services/session.service';

// pipes
import { SkillsPipe } from './components/pipes/skills.pipe';
import { StatusPipe } from './components/pipes/status.pipe';
import { ArrayIntersectPipe } from './components/pipes/array-intersect.pipe';
import { DateRangePipe } from './components/pipes/date-range.pipe';
import { InterestPipe } from './components/pipes/interest.pipe';
import { SearchFilterPipe } from './components/pipes/search-filter.pipe';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { HeaderComponent } from './pages/header/header.component';
import { FiltersComponent } from './components/filters/filters.component';
import { RequestdetailsComponent } from './pages/requestdetails/requestdetails.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationItemComponent } from './components/notification/notification-item/notification-item.component';
import { MentorRequestDetailComponent } from './pages/requestdetails/mentor-request-detail.component';
import { MenteeComponent } from './pages/mentee/mentee.component';
import { MentorComponent } from './pages/mentor/mentor.component';
import { AdminRequestsComponent } from './pages/admin/requests/admin-requests.component';
import { AdminReportComponent } from './pages/admin/report/admin-report.component';
import { AdminSkillsComponent } from './pages/admin/skills/admin-skills.component';
import { CancelRequestDialogComponent } from './pages/cancelrequest/cancelrequest.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { EditDialogComponent } from './pages/editrequest/edit-request.component';
import { SlackModalDialogComponent } from './components/slack-modal-dialog/slack-modal-dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RequestDetailMiniComponent } from './components/request-detail/request-detail.mini-component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SkillDialogComponent } from './components/skill-dialog/skill-dialog.component';
import { LogSessionDialogComponent } from './components/sessions/dialog/log-session-dialog.component';
import { RateSessionDialogComponent } from './components/sessions/sessions-rating/rating-dialog/rate-session-dialog.component'
import { RatingStarComponent } from './components/sessions/sessions-rating/rating-star/rating-star.component'

// environment
import { environment } from '../environments/environment';
import { localStorage } from '../app/globals';
import {AngularFireDatabase} from "angularfire2/database";

const authToken = Cookie.get('jwt-token');
if (authToken) {
  localStorage.setItem('id_token', authToken);
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'admin/requests', component: AdminRequestsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/report', component: AdminReportComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/skills', component: AdminSkillsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin', redirectTo: 'admin/requests', pathMatch: 'full' },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'requests/:id', component: RequestdetailsComponent, canActivate: [AuthGuard] },
  { path: 'requests/:id/mentor', component: MentorRequestDetailComponent, canActivate: [AuthGuard] },
  { path: 'mentee', component: MenteeComponent, canActivate: [AuthGuard] },
  { path: 'mentor', component: MentorComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AdminRequestsComponent,
    AdminReportComponent,
    AdminSkillsComponent,
    AppComponent,
    DashboardComponent,
    LoginComponent,
    PagenotfoundComponent,
    RequestsComponent,
    HeaderComponent,
    FiltersComponent,
    RequestdetailsComponent,
    NotificationComponent,
    NotificationItemComponent,
    MentorRequestDetailComponent,
    MenteeComponent,
    MentorComponent,
    CancelRequestDialogComponent,
    DialogModalComponent,
    EditDialogComponent,
    SlackModalDialogComponent,
    RequestDetailMiniComponent,
    SessionsComponent,
    SkillDialogComponent,
    LogSessionDialogComponent,
    RateSessionDialogComponent,
    RatingStarComponent,

    // pipes
    SkillsPipe,
    StatusPipe,
    ArrayIntersectPipe,
    DateRangePipe,
    InterestPipe,
    ProfileComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule, // TODO: Refactor, MaterialModule has been been deprecated
    SelectModule,
    AccordionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MomentModule
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: HttpService.useFactory,
      deps: [XHRBackend, RequestOptions]
    },
    AngularFireDatabase,
    AuthService,
    AuthGuard,
    AdminGuard,
    SkillService,
    RequestService,
    NotificationService,
    FilterService,
    HelperService,
    UserService,
    SessionService
  ],
  entryComponents: [
    DialogModalComponent,
    CancelRequestDialogComponent,
    EditDialogComponent,
    SkillDialogComponent,
    SlackModalDialogComponent,
    LogSessionDialogComponent,
    RateSessionDialogComponent,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
