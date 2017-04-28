import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SkillService } from './../../services/skill.service';
import { RequestService } from './../../services/request.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-requestdetails',
  templateUrl: './requestdetails.component.html',
  styleUrls: ['./requestdetails.component.scss'],
})
export class RequestdetailsComponent implements OnInit {
  skills: any;
  details: any;
  private requestId: number;

  constructor(
    private skillsService: SkillService,
    private requestsService: RequestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     this.requestId = this.route.snapshot.params['id'];
      this.skillsService.getSkills().toPromise().then((res) => {
          this.skills = res.data;
      });

      this.requestsService.getRequestDetails(this.requestId).toPromise().then((res) => {
          this.details = res.data[0];
      });
  }
}
