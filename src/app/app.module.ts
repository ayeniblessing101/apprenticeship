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
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartModule } from 'angular2-chartjs';

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
import { SegmentService } from './services/segment.service';
import { NotificationSettingsService } from './services/notifications-settings.service';

// pipes
import { SkillsPipe } from './components/pipes/skills.pipe';
import { StatusPipe } from './components/pipes/status.pipe';
import { ArrayIntersectPipe } from './components/pipes/array-intersect.pipe';
import { DateRangePipe } from './components/pipes/date-range.pipe';
import { InterestPipe } from './components/pipes/interest.pipe';
import { SearchFilterPipe } from './components/pipes/search-filter.pipe';
import { RolePipe } from './components/pipes/roles.pipe';
import { SessionDatePipe } from './components/pipes/session-date.pipe';

// components
import { AppRoutesModule } from './app-routes.module';
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
import { MenteeComponent } from './pages/mentee/mentee.component';
import { MentorComponent } from './pages/mentor/mentor.component';
import { AdminRequestsComponent } from './pages/admin/requests/admin-requests.component';
import { AdminReportComponent } from './pages/admin/report/admin-report.component';
import { AdminSkillsComponent } from './pages/admin/skills/admin-skills.component';
import { CancelRequestDialogComponent } from './pages/cancelrequest/cancelrequest.component';
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { EditDialogComponent } from './pages/editrequest/edit-request.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RequestDetailMiniComponent } from './components/request-detail/request-detail.mini-component';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SkillDialogComponent } from './components/skill-dialog/skill-dialog.component';
import { LogSessionDialogComponent } from './components/sessions/dialog/log-session-dialog.component';
import { RejectSessionDialogComponent } from './components/sessions/reject-session/reject-session-dialog.component'
import { RateSessionDialogComponent } from './components/sessions/sessions-rating/rating-dialog/rate-session-dialog.component';
import { RatingStarComponent } from './components/sessions/sessions-rating/rating-star/rating-star.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SelectMentorButtonComponent } from './pages/requestdetails/select-mentor-button/select-mentor-button.component';
import { MentorProfileModalComponent } from './pages/requestdetails/mentor-profile-modal/mentor-profile-modal.component';
import { GraphComponent } from './components/graph/graph.component';

// environment
import { environment } from '../environments/environment';
import { localStorage } from '../app/globals';
import { AngularFireDatabase } from 'angularfire2/database';
import { SettingsNavigationComponent } from './pages/settings/settings-navigation/settings-navigation.component';
import { NotificationSettingsComponent } from './pages/settings/notification-settings/notification-settings.component';

import { DateValidator } from './components/sessions/dialog/date.validator';
const authToken = Cookie.get('jwt-token');
if (authToken) {
  localStorage.setItem('id_token', authToken);
}

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
    MenteeComponent,
    MentorComponent,
    CancelRequestDialogComponent,
    DialogModalComponent,
    EditDialogComponent,
    RequestDetailMiniComponent,
    SessionsComponent,
    SkillDialogComponent,
    LogSessionDialogComponent,
    RejectSessionDialogComponent,
    RateSessionDialogComponent,
    RatingStarComponent,
    PaginationComponent,
    SettingsComponent,
    NotificationSettingsComponent,
    SettingsNavigationComponent,
    SelectMentorButtonComponent,
    MentorProfileModalComponent,
    GraphComponent,

    // pipes
    SkillsPipe,
    StatusPipe,
    ArrayIntersectPipe,
    DateRangePipe,
    InterestPipe,
    ProfileComponent,
    SearchFilterPipe,
    RolePipe,
    SessionDatePipe,
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule, // TODO: Refactor, MaterialModule has been been deprecated
    SelectModule,
    AccordionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MomentModule,
    NgxPaginationModule,
    ChartModule,
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: HttpService.useFactory,
      deps: [XHRBackend, RequestOptions],
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
    SessionService,
    SegmentService,
    DateValidator,
    NotificationSettingsService,
  ],
  entryComponents: [
    DialogModalComponent,
    CancelRequestDialogComponent,
    EditDialogComponent,
    SkillDialogComponent,
    LogSessionDialogComponent,
    RejectSessionDialogComponent,
    RateSessionDialogComponent,
    MentorProfileModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
