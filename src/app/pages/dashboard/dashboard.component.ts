import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  requests: any;

  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.requestService.getRequests(20)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error
      );
  }
}
