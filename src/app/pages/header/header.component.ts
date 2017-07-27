import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SegmentService }from '../../services/segment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  picture: string;
  firstName: string;
  isAdmin: Boolean;
  userId: string;

  constructor(
    private authService: AuthService,
    private segmentService: SegmentService
  ) {
    this.picture = this.authService.userInfo.picture;
    this.firstName = this.authService.userInfo.first_name;
    this.isAdmin = false;
    this.userId = this.authService.userInfo.id;
  }

  ngOnInit() {
    if (this.authService.userInfo.roles.LENKEN_ADMIN) {
      this.isAdmin = true;
    }
  }
}
