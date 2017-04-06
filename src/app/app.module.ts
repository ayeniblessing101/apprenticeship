import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SkillService } from './services/skill.service';
import { RequestService } from './services/request.service';
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


const authToken = Cookie.get('jwt-token');
if (authToken) {
  localStorage.setItem('id_token', authToken);
}

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
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
  ],
  providers: [AuthService, AuthGuard, SkillService, RequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
