import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoolComponent } from './pool/pool.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PoolComponent],
  exports: [PoolComponent]
})
export class RequestPoolModule { }
