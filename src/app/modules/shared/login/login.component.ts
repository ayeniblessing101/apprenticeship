import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  notice;
  message = '';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 2000;
  addExtraClass = false;
  redirectUrl = `${environment.apiGateway}/login?redirect_url=${environment.lenkenBaseUrl}/request-pool`;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
    if (window.location.href.includes('logout')) {
      this.auth.logOut();
    }
    this.notice = this.auth.notice;
  }

  setMessage() {
    if (this.notice === 'permission') {
      this.message = 'Hello! It seems you do not have permission to access this application. Login using an Andelan email address';
    } else if (this.notice === 'unauthenticated') {
      this.message = 'Unauthorized ¯¯\\_(ツ)_/¯¯';
    }
  }

  ngOnInit() {
    if (this.notice != null) {
      this.setMessage();
    }
  }
}
