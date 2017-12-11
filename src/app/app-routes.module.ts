import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/shared/login/login.component';
import { PageNotFoundComponent } from './modules/shared/page-not-found/page-not-found.component';
import { PoolComponent } from './modules/request-pool/pool/pool.component';
import { HistoryComponent } from './modules/request-pool/history/history.component';
import { InProgressComponent } from './modules/request-pool/in-progress/in-progress.component';
import { SharedModule } from './modules/shared/shared.module';
import { PendingComponent } from 'app/modules/request-pool/pending/pending.component';

import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { HeaderComponent } from './modules/shared/header/header.component';

const appRoutes: Routes = [

  { path: '', redirectTo: 'request-pool', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'logout', component: HeaderComponent },

  { path: 'request-pool', component: PoolComponent, canActivate: [AuthGuard] },

  { path: 'request-pool/history', component: HistoryComponent, canActivate: [AuthGuard] },

  { path: 'request-pool/in-progress', component: InProgressComponent, canActivate: [AuthGuard] },

  { path: 'request-pool/pending', component: PendingComponent, canActivate: [AuthGuard] },

  { path: 'profile', loadChildren: './modules/user-profile/user-profile.module#UserProfileModule' },

  { path: 'admin/requests', component: PoolComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'admin/skills', component: PoolComponent, canActivate: [AuthGuard, AdminGuard] },

  { path: 'admin/reports', component: PoolComponent, canActivate: [AuthGuard, AdminGuard] },


  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})

export class AppRoutesModule {}
