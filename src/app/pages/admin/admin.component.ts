import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { RequestService } from '../../services/request.service';


@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})

export class AdminComponent implements OnInit {
  private allRequests: Array<Object> = [];
  private requestedBy: string = 'Abolaji Femi';
  private limit: number = 10;
  private loading: boolean = false;

  constructor (private requests: RequestService ) {}

  ngOnInit() {
    this.getRequests(this.limit);
  }

  getRequests(limit: number):void {
    this.loading = true;
    this.requests.getRequests(limit)
      .subscribe(requests => {
        this.loading = false;
        this.extractRequest(requests)
      })
  }

  extractRequest(requestsArray: Array<Object>): any {
    requestsArray.forEach(request => {
      this.allRequests.push(request);
    });
  }

  getStatusClass(status: string): string {
    let statusClass: string = '';

    switch (status.toLowerCase()) {
      case 'open': statusClass = 'rounded-chip-open'; break;
      case 'closed': statusClass = 'rounded-chip-closed'; break;
      default: statusClass = 'rounded-chip-matched';
    }

    return statusClass;
  }

}
