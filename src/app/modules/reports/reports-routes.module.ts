import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsPageComponent } from 'app/modules/reports/reports-page/reports-page.component';

const routes: Routes = [
  { path: '', component: ReportsPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class ReportsRoutesModule { }
