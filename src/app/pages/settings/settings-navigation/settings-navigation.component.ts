import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.scss']
})
export class SettingsNavigationComponent implements OnInit {

  userId: string;

  constructor(private authService: AuthService) { 
    this.userId = this.authService.userInfo.id;
  }

    ngOnInit() {}
}
