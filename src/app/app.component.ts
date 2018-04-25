import { Component, AfterContentChecked } from '@angular/core';
import { Router, NavigationEnd, Event, NavigationStart, NavigationError, NavigationCancel } from '@angular/router';
import { Intercom } from 'ng2-intercom/intercom';
import { SegmentService } from './services/segment.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentChecked {
  showNavAndHeader = true;
  currentUser: any;
  loading = true;
  isMainWrapperRequired = true;
  constructor(
    router: Router,
    private segmentService: SegmentService,
    private userService: UserService,
    private authService: AuthService,
    private intercom: Intercom,
  ) {
    router.events.subscribe((routerEvent) => {
      this.checkRouterEvent(routerEvent);
    });

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
          this.isMainWrapperRequired = false;
        }
      }
    });

    this.initializeIntercom();
  }

  ngAfterContentChecked() {
    this.moveIntercomWidget();
  }

  /**
   * Initialize intercom widget
   *
   * @return {Void}
   */
  initializeIntercom() {
    const config = {
      app_id: environment.intercomAppId,
      widget: {
        activator: '#intercom',
      },
    };

    if (this.currentUser) {
      this.intercom.init({
        ...config,
        name: this.currentUser.name,
        email: this.currentUser.email,
      });
    } else {
      this.intercom.init(config);
    }
  }

  /**
   * It shows up a loader when a route is been processed and removes
   * the loader when the routes is fully a resolved.
   *
   * @param routerEvent the router event to be checked.
   *
   * @return {Void}
   */
  checkRouterEvent(routerEvent) {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationEnd
    || routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  /**
   * It moves the position of the intercom widget
   *
   * @return {Void}
   */
  moveIntercomWidget() {
    const element = document.getElementsByTagName('iframe');
    if (element.item(1) && element.item(2)) {
      element.item(1).style.bottom = '50px';
      element.item(2).style.bottom = '50px';
    }
  }
}
