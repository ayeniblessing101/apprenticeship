import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  picture: string;
  firstName: string;
  constructor(
    private auth: AuthService,
  ) {
    this.picture = this.auth.userInfo.picture;
    this.firstName = this.auth.userInfo.first_name;
  }
}
