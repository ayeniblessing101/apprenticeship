import { Component } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart } from '@angular/router';
import { SegmentService } from './services/segment.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    router: Router,
    private segmentService: SegmentService,
    private userService: UserService,
    private authService: AuthService
  ) {
    if (localStorage.getItem('id_token')) {
      this.authService.decodeToken();
      const fellowId  = this.authService.userInfo.id;
      this.userService.getUserInfo(fellowId)
        .toPromise()
        .then((response) => {
          const userLevel = response.level.name;
          segmentService.track('LOGGED IN', { fellowLevel: userLevel });
        })
        .catch(() => {});
    }

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.segmentService.page(event.url, {
          type: 'Lenken segment client'
        });
      }
    });
  }
  title = 'app works!';
}
