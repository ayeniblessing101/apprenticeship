import { Component, OnInit, ViewChild } from '@angular/core';
import { PoolComponent } from '../../request-pool/pool/pool.component';
import { PoolRecordsComponent } from '../../request-pool/pool-records/pool-records.component';

@Component({
  selector: 'app-all-requests-page',
  templateUrl: './all-requests-page.component.html',
  styleUrls: ['./all-requests-page.component.scss'],
})
export class AllRequestsPageComponent implements OnInit {
  @ViewChild(PoolComponent) poolComponent;
  loadingRequests: boolean;

  ngOnInit() {
    this.loadRequests();
  }

/**
 * Applies loader depending on boolean value from
 * the PoolComponent
 *
 */
  loadRequests() {
    this.loadingRequests = this.poolComponent.loadingRequests;
  }

  /**
   * Fetches the applyFilters function from pool component
   *
   * @param  {object} event - contains the applied location filter
   *
   * @return {void}
   */
  applyFilters(event: object): void {
    this.poolComponent.applyFilters(event);
  }
}
