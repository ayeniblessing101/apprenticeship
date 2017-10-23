import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [HeaderComponent, NavBarComponent, LoginComponent, PageNotFoundComponent],
  exports: [HeaderComponent, NavBarComponent, LoginComponent],
  providers: [],
})
export class SharedModule { }
