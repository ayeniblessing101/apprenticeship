 import { Component } from '@angular/core';
 import { Router } from '@angular/router';
 
 import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
    if (environment.production) {
      const urlProtocol = window.location.protocol;

      if (urlProtocol === 'http:') {
          window.location.href = `https://${window.location.host}`; 
      }
    }
  }
}
