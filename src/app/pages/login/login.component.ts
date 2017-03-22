import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  message = '';
  actionButtonLabel = 'Retry';
  action = false;
  setAutoHide = true;
  autoHide = 10000;
  addExtraClass = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public snackBar: MdSnackBar
  ) {
    Cookie.deleteAll();
    localStorage.removeItem('id_token');
  }

  notice = this.auth.notice;

  /**
  *  openSnackBar
  *
  *  calls angular material design snackbar to display the various notice
  *  messages
  *
  */
  openSnackBar() {
    if (this.notice === 'permission') {
      this.message = "Hello! It seems you do not have permission to access this application. Login using an Andelan email address";
    } else if (this.notice === 'unauthorized') {
      this.message = "Unauthorized ¯¯\\_(ツ)_/¯¯";
    }

    const config = new MdSnackBarConfig();
    config.duration = this.autoHide;
    config.extraClasses = this.addExtraClass ? ['party'] : null;
    this.snackBar.open(this.message, this.action && this.actionButtonLabel, config);
  }

  ngOnInit() {
    if (this.notice != null) {
      this.openSnackBar()
    }
  }
}