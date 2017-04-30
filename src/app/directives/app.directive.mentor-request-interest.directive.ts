import { RequestService } from './../services/request.service';
import { NotificationService } from '../services/notifications.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { HostListener, Directive, Injector } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Directive({selector: 'button[appMentorshipInterestButton]'})
export class IndicateInterestDirective {
  private mentorId: string | number;
  private menteeId: string | number;
  private mentorName: string;
  private requestId: number;

  constructor(
    private page: Injector,
    private requestsService: RequestService,
    private notificationService: NotificationService,
    private auth: AuthService
  ) { }

  @HostListener('click', ['$event.target'])
  onClick(button) {
    this.mentorId = this.auth.userInfo.id;
    this.menteeId = this.page['_view'].context.details.mentee_id;
    this.mentorName = this.auth.userInfo.name;
    this.requestId = this.page['_view'].context.details.id;
    
    return this.requestsService
      .updateMentorRequest(this.requestId, { interested: [this.mentorId] })
      .toPromise()
      .then(res => this.notificationService.sendMessage([this.menteeId], {
        type: '',
        message: {
          title: `${this.mentorName} has indicated interest in being your mentor`,
          content: 'I would like to mentor you.'
        },
        sender: `${this.mentorName}`,
        timestamp: Date.now(),
        messageUrl: `${environment.lenkenBaseUrl}/requests/${this.requestId}`
      }))
      .catch(err => err);
  }
}
