import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PoolComponent } from './pool/pool.component';

import { RequestService } from '../../services/request.service';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
  ],
  declarations: [PoolComponent],
  exports: [PoolComponent],
  providers: [RequestService]
})
export class RequestPoolModule { }
