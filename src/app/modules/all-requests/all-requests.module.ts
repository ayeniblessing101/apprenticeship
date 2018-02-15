import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRequestsRoutesModule } from './all-requests-routes.module';
import { AllRequestsPageComponent } from './all-requests-page/all-requests-page.component';
import { RequestStatisticsComponent } from './request-statistics/request-statistics.component';
import { RequestPoolModule } from '../request-pool/request-pool.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AllRequestsRoutesModule,
    RequestPoolModule,
    SharedModule,
  ],
  declarations: [AllRequestsPageComponent, RequestStatisticsComponent],
})
export class AllRequestsModule { }
