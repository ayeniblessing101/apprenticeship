import { Component } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart } from '@angular/router';
import { SegmentService } from './services/segment.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showNavAndHeader = true;
  currentUser: any;
  constructor(
    router: Router,
    private segmentService: SegmentService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    if (localStorage.getItem('id_token')) {
      this.authService.decodeToken();
      const userId  = this.authService.userInfo.id;
      this.userService.getUserInfo(userId)
        .toPromise()
        .then((response) => {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUser = response;
          const userLevel = response.level.name ? response.level.name : '<not available>';
          segmentService.track('LOGGED IN', { fellowLevel: userLevel });
        })
        .catch(() => {});
    }

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.segmentService.page(event.url, {
          type: 'Lenken segment client',
        });
        if (event.url === '/login' || event.url === '/logout') {
          this.showNavAndHeader = false;
        }
      }
    });
  }
}
