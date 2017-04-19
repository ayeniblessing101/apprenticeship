import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  errorMessage: string;
  requests: any;
  constructor(
    private requestService: RequestService
  ) { }

  ngOnInit() {
    this.getMentorRequests();
  }

  getMentorRequests() {
    this.requestService.getMentorRequests(20)
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = <any>error,
      );
  }

}
