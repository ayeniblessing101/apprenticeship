import { Component, OnInit } from '@angular/core';
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

  constructor(
      private skillsService: SkillService,
      private requestsService: RequestService) { }

  ngOnInit() {
      this.skillsService.getSkills().toPromise().then((res) => {
          this.skills = res.data;
      });

      this.requestsService.getRequestDetails().toPromise().then((res) => {
          this.details = res.data[0];
      });
  }
}
