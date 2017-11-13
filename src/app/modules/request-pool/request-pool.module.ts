import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StarRatingModule } from 'angular-star-rating';

import { PoolComponent } from './pool/pool.component';
import { SharedModule } from '../shared/shared.module';
import { HistoryComponent } from './history/history.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { RequestService } from '../../services/request.service';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    SharedModule,
    StarRatingModule.forRoot(),
  ],
  declarations: [PoolComponent, HistoryComponent, InProgressComponent],
  exports: [PoolComponent],
  providers: [RequestService],
})
export class RequestPoolModule { }
