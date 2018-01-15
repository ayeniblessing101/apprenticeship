import { Component, OnInit } from '@angular/core';
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
  action = false;
  redirectUrl = `${environment.apiGateway}/login?redirect_url=${environment.lenkenBaseUrl}/request-pool`;

  constructor(
    private auth: AuthService,
  ) {
    this.notice = this.auth.notice;
  }

  setMessage() {
    if (this.notice === 'permission') {
      this.message = 'Hello! It seems you do not have permission to access this application. Login using an Andelan email address';
    }
  }

  ngOnInit() {
    if (this.notice != null) {
      this.setMessage();
    }
  }
}
