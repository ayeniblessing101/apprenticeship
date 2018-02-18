import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  showNavContent = true;
  constructor(
    private router: Router,
  ) {
    if (!localStorage.getItem('id_token')) {
      this.showNavContent = false;
    }
  }
}
