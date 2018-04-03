import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsPageComponent } from './reports-page/reports-page.component';
import { InactiveMentorshipGraphComponent } from './inactive-mentorship/inactive-mentorship-graph.component';
import { SkillService } from '../../services/skill.service';
import { ReportsRoutesModule } from './reports-routes.module';
import { SharedModule } from '../shared/shared.module'
import { CommonModule } from '@angular/common';
import { RequestCountBarChartComponent } from './request-count-bar-chart/request-count-bar-chart.component';
import { ReportsService } from 'app/services/reports.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReportsRoutesModule,
    SharedModule,
  ],
  providers: [ReportsService, SkillService],
  declarations: [
    RequestCountBarChartComponent,
    ReportsPageComponent,
    InactiveMentorshipGraphComponent,
  ],
})
export class ReportsModule { }
