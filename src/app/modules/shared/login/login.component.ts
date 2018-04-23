import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  redirectUrl = `${environment.apiGateway}/login?redirect_url=${environment.lenkenBaseUrl}/request-pool`;

  constructor(
    private auth: AuthService,
    private toastService: ToastService,
  ) {}

  ngOnInit() {
    if (this.auth.notice !== null) {
      this.setMessage();
    }
  }

  setMessage() {
    if (this.auth.notice === 'invalid email') {
      this.toastService.displayMessage(
        'Please login with your Andela email',
        'error',
        4000,
      );
    }
  }
}
