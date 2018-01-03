import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRequestsRoutesModule } from './all-requests-routes.module';
import { AllRequestsPageComponent } from './all-requests-page/all-requests-page.component';
import { RequestStatisticsComponent } from './request-statistics/request-statistics.component';
import { RequestPoolModule } from '../request-pool/request-pool.module';

@NgModule({
  imports: [
    CommonModule,
    AllRequestsRoutesModule,
    RequestPoolModule,
  ],
  declarations: [AllRequestsPageComponent, RequestStatisticsComponent],
})
export class AllRequestsModule { }
