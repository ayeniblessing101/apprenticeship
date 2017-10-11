import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/auth-guard.service';
import { AdminRequestsComponent } from './pages/admin/requests/admin-requests.component';
import { AdminReportComponent } from './pages/admin/report/admin-report.component';
import { AdminSkillsComponent } from './pages/admin/skills/admin-skills.component';
import { RequestdetailsComponent } from './pages/requestdetails/requestdetails.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MentorComponent } from './pages/mentor/mentor.component';
import { MenteeComponent } from './pages/mentee/mentee.component';
import { RequestsComponent } from './pages/requests/requests.component';
import { AdminGuard } from './services/admin-guard.service';
import { SettingsComponent } from './pages/settings/settings.component';
import { NotificationSettingsComponent } from './pages/settings/notification-settings/notification-settings.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

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
  { path: 'my-requests', component: MenteeComponent, canActivate: [AuthGuard] },
  { path: 'my-interests', component: MentorComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'notifications', pathMatch: 'full' },
      { path: 'notifications', component: NotificationSettingsComponent },
    ],
  },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutesModule {}
