import { Component, OnInit } from '@angular/core';

import { SkillService } from './../../services/skill.service';
import { RequestService } from './../../services/request.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-mentor-request-detail',
  templateUrl: './mentor-request-detail.component.html',
  styleUrls: ['./mentor-request-detail.component.scss']
})
export class MentorRequestDetailComponent implements OnInit {
  skills: any;
  details: any;

  constructor(private requestsService: RequestService) { }

  ngOnInit() {
    this.requestsService.getRequestDetails()
      .toPromise()
      .then((res) => {
        this.skills = res.data[0].skills.split(', ');
        this.details = res.data[0];
      });
  }
}
