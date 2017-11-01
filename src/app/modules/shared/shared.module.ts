import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [HeaderComponent, NavBarComponent, PageNotFoundComponent, LoginComponent],
  exports: [PageNotFoundComponent, LoginComponent, HeaderComponent, NavBarComponent],
  providers: [],
})
export class SharedModule { }
