import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PoolComponent } from './pool/pool.component';
import { SharedModule } from '../shared/shared.module';
import { RequestService } from '../../services/request.service';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    SharedModule,
  ],
  declarations: [PoolComponent],
  exports: [PoolComponent],
  providers: [RequestService]
})
export class RequestPoolModule { }
