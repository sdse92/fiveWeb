import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { CourseService } from './course/course.service';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main-page/main.component';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { AuthInterceptorService } from './utility/auth-interceptor.service';
import { ConfigurationService } from './utility/configuration.service';
import { SecurityService } from './utility/security.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    LoginComponent,
    UserComponent,
    CourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    NgbModule, 
    MdbCheckboxModule
  ],
  providers: [
    SecurityService,
    ConfigurationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CourseService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
