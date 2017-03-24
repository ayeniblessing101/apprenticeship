import { Component, OnInit } from '@angular/core';
import { LenkenService } from '../../lenken.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  errorMessage: string;
  requests: any;

  constructor(
    private api: LenkenService
  ) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.api.getRequests(20)
      .subscribe(
      requests => this.requests = requests,
      error => this.errorMessage = <any>error);
  }

}
