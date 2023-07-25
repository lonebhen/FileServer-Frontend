import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxExtendedPdfViewerCommonModule } from 'ngx-extended-pdf-viewer/lib/ngx-extended-pdf-viewer-common.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer/public_api';

import { NgxSpinnerModule } from 'ngx-spinner';





import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component'
import { AuthService } from './Services/auth.service';
import { FeedService } from './Services/feed.service';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { FileActivityService } from './Services/file-activity.service';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { PasswordResetComponent } from './Components/password-reset/password-reset.component';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer/public_api';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    NotFoundComponent,
    SignUpComponent,
    WelcomeComponent,
    PasswordResetComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    // NgxExtendedPdfViewerModule
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthService, FeedService, FileActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
