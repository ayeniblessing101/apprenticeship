import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AngularFireModule } from 'angularfire2';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SkillService } from './services/skill.service';
import { RequestService } from './services/request.service';
import { NotificationService } from './services/notifications.service';
import { environment } from '../environments/environment';
import { FilterService } from './services/filter.service';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { RequestsComponent } from './pages/requests/requests.component';
import { HeaderComponent } from './pages/header/header.component';
import { SelectModule } from 'ng-select';
import { AccordionModule } from 'ngx-accordion';
import { FiltersComponent } from './components/filters/filters.component';
import { RequestdetailsComponent } from './pages/requestdetails/requestdetails.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationItemComponent } from './components/notification/notification-item.component';
import { MentorRequestDetailComponent } from './pages/requestdetails/mentor-request-detail.component';
import { MenteeComponent } from './pages/mentee/mentee.component';
import { SkillsPipe } from './components/pipes/skills.pipe';
import { StatusPipe } from './components/pipes/status.pipe';
import { ArrayIntersectPipe } from './components/pipes/array-intersect.pipe';


const authToken = Cookie.get('jwt-token');
if (authToken) {
  localStorage.setItem('id_token', authToken);
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'requests', component: RequestsComponent, canActivate: [AuthGuard] },
  { path: 'requests/:id', component: RequestdetailsComponent, canActivate: [AuthGuard]},
  { path: 'requests/:id/mentor', component: MentorRequestDetailComponent, canActivate: [AuthGuard] },
  { path: 'mentee', component: MenteeComponent },
  { path: '**', component: PagenotfoundComponent }
];


@NgModule({
  declarations: [
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
    SkillsPipe,
    StatusPipe,
    ArrayIntersectPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule,
    SelectModule,
    AccordionModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [AuthService, AuthGuard, SkillService, RequestService, NotificationService, FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
