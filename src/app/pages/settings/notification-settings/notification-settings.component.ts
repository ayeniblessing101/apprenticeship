import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.scss']
})
export class NotificationSettingsComponent implements OnInit {

  userId: string; 
  
  constructor(private authService: AuthService) { 
    this.userId = this.authService.userInfo.id;
  }

  ngOnInit() {
    console.log(this.authService.userInfo.id);
  }

}
