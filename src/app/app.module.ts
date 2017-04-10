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
import { NotificationService } from './services/notifications/notifications.service';
import { environment } from '../environments/environment';
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
import { NotificationComponent }  from './components/notification/notification.component';
import { NotificationItem }  from './components/notification/notification-item.component';

const authToken = Cookie.get('jwt-token');
if (authToken) {
  localStorage.setItem('id_token', authToken);
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  { path: 'requests',  component: RequestsComponent},
  { path: 'requests/:id', component: RequestdetailsComponent, canActivate: [AuthGuard]},
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
    NotificationItem
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
  providers: [AuthService, AuthGuard, SkillService, RequestService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
