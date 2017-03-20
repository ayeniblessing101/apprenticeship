import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  constructor(
    private auth: AuthService,
  ) {}
  picture = this.auth.userInfo.picture;
  firstName = this.auth.userInfo.first_name;
}
