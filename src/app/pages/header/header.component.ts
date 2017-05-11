import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  picture: string;
  firstName: string;
  isAdmin: Boolean;

  constructor(
    private authService: AuthService,
  ) {
    this.picture = this.authService.userInfo.picture;
    this.firstName = this.authService.userInfo.first_name;
    this.isAdmin = false;
  }

  ngOnInit() {
    if (this.authService.userInfo.roles.LENKEN_ADMIN) {
      this.isAdmin = true;
    }
  }
}
