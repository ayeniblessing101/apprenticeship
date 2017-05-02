import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotificationService } from '../../services/notifications.service';
import { SkillService } from './../../services/skill.service';
import { RequestService } from './../../services/request.service';
import { Details } from '../../interfaces/details.interface';
import { Pairing } from '../../interfaces/pairing.interface';
import { Skill } from '../../interfaces/skill.interface';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-mentor-request-detail',
  templateUrl: './mentor-request-detail.component.html',
  styleUrls: ['./mentor-request-detail.component.scss']
})
export class MentorRequestDetailComponent implements OnInit {
  skills: Array<Skill>;
  details: Details;
  pairing: Pairing;
  days: any = [];
  private requestId: number;

  constructor(
    private requestsService: RequestService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.requestId = this.route.snapshot.params['id'];
    this.requestsService.getRequestDetails(this.requestId)
      .toPromise()
      .then((res) => {
        this.details = res.data;
        this.pairing = res.data.pairing;
        this.days = this.pairing['days'];
      });
  }

  /**
   * Indicate interest method updates the current mentorship request data
   * and adds a new user id to the interest field array.
   *
   * @param {Object} details the request details
   *
   * @return {Object} the response of the api call
   */
  indicateInterest(details) {
    const mentorId = this.auth.userInfo.id;
    const menteeId = details.mentee_id;
    const mentorName = this.auth.userInfo.name;
    const requestId = details.id;

    return this.requestsService
      .updateMentorRequest(requestId, { interested: [mentorId] })
      .toPromise()
      .then(() => this.notificationService.sendMessage([menteeId], {
        type: '',
        message: {
          title: `${mentorName} has indicated interest in being your mentor`,
          content: 'I would like to mentor you.'
        },
        sender: `${mentorName}`,
        timestamp: Date.now(),
        messageUrl: `${environment.lenkenBaseUrl}/requests/${requestId}`
      }))
      .catch(err => err);
  }
}
