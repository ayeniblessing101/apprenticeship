// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AngularFireModule } from 'angularfire2';
import { MomentModule } from 'angular2-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// services
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';
import { FilterService } from './services/filter.service';
import { HttpService } from './services/http.service';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { SegmentService } from './services/segment.service';

// components
import { AppRoutesModule } from './app-routes.module';
import { AppComponent } from './app.component';

import { SharedModule } from './modules/shared/shared.module';
import { RequestPoolModule } from './modules/request-pool/request-pool.module';
import { AllRequestsModule } from './modules/all-requests/all-requests.module';

// environment
import { environment } from '../environments/environment';
import { localStorage } from '../app/globals';
import { AngularFireDatabase } from 'angularfire2/database';
import { NotificationService } from 'app/services/notifications.service';
const authToken = Cookie.get('jwt-token');
if (authToken) {
  localStorage.setItem('id_token', authToken);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MomentModule,
    SharedModule,
    RequestPoolModule,
    AllRequestsModule,
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: HttpService.useFactory,
      deps: [XHRBackend, RequestOptions],
    },
    AngularFireDatabase,
    AuthService,
    AuthGuard,
    AdminGuard,
    FilterService,
    UserService,
    AlertService,
    SegmentService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
