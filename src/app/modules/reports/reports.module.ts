import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { InactiveMentorshipGraphComponent } from './inactive-mentorship/inactive-mentorship-graph.component';
import { ReportsService } from '../../services/reports.service';
import { ReportsRoutesModule } from './reports-routes.module';
import { SharedModule } from '../shared/shared.module'

@NgModule({
  imports: [
    ReportsRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [ReportsService],
  declarations: [
    ReportsPageComponent,
    InactiveMentorshipGraphComponent,
  ],
})
export class ReportsModule { }
