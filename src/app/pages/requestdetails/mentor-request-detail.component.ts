import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private requestId: number;

  constructor(
    private requestsService: RequestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.requestId = this.route.snapshot.params['id'];
    this.requestsService.getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        this.skills = res.data[0].skills.split(', ');
        this.details = res.data[0];
      });
  }
}
