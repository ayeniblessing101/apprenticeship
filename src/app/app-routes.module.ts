import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/shared/login/login.component';
import { PageNotFoundComponent } from './modules/shared/page-not-found/page-not-found.component';
import { UnauthorizedPageComponent } from './modules/shared/unauthorized-page/unauthorized-page.component';
import { PoolComponent } from './modules/request-pool/pool/pool.component';
import { HistoryComponent } from './modules/request-pool/history/history.component';
import { InProgressComponent } from './modules/request-pool/in-progress/in-progress.component';
import { SharedModule } from './modules/shared/shared.module';
import { PendingComponent } from 'app/modules/request-pool/pending/pending.component';
import { SkillDetailsPageComponent } from './modules/skills/skill-details-page/skill-details-page.component';

import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { HeaderComponent } from './modules/shared/header/header.component';
import {
  InProgressSingleViewComponent,
} from './modules/request-pool/in-progress-single-view/in-progress-single-view.component';
import { RequestResolver } from './resolvers/request.resolver';
import { SkillsResolver } from './resolvers/skills.resolver';
import { HistoryPageComponent } from './modules/request-pool/history-page/history-page.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'request-pool', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'logout', component: HeaderComponent },

  { path: 'request-pool', component: PoolComponent, canActivate: [AuthGuard] },

  { path: 'request-pool/history', component: HistoryComponent, canActivate: [AuthGuard] },

  {
    path: 'request-pool/history/:id',
    component: HistoryPageComponent,
    canActivate: [AuthGuard],
    resolve: {
      request: RequestResolver,
    },
  },

  { path: 'request-pool/in-progress', component: InProgressComponent, canActivate: [AuthGuard] },

  {
    path: 'request-pool/in-progress/:id',
    component: InProgressSingleViewComponent,
    canActivate: [AuthGuard],
    resolve: {
      request: RequestResolver,
    },
  },

  { path: 'request-pool/pending', component: PendingComponent, canActivate: [AuthGuard] },

  { path: 'profile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule',
    canActivate: [AuthGuard] },

  { path: 'admin/create-request', component: PoolComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'all-requests', loadChildren: './modules/all-requests/all-requests.module#AllRequestsModule',
    canActivate: [AuthGuard, AdminGuard] },

  { path: 'admin/skills',
    loadChildren: './modules/skills/skills.module#SkillsModule',
    canActivate: [AuthGuard, AdminGuard],
    resolve: {
      skills: SkillsResolver,
    },
  },

  { path: 'admin/reports', loadChildren: './modules/reports/reports.module#ReportsModule',
    canActivate: [AuthGuard, AdminGuard] },

  { path: 'unauthorized', component: UnauthorizedPageComponent },

  { path: 'page-not-found', component: PageNotFoundComponent },

  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutesModule {}

