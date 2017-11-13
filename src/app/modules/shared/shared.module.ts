import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PoolFiltersComponent } from './pool-filters/pool-filters.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdCardModule,
  MdCheckboxModule,
  MdSelectModule,
  MdRadioModule,
  MdSliderModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MdCardModule,
    MdCheckboxModule,
    MdSelectModule,
    MdRadioModule,
    MdSliderModule,
  ],
  declarations: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PageNotFoundComponent,
    PoolFiltersComponent,
  ],
  exports: [
    HeaderComponent,
    NavBarComponent,
    LoginComponent,
    PoolFiltersComponent,
    PageNotFoundComponent,
  ],
  providers: [],
})
export class SharedModule { }
