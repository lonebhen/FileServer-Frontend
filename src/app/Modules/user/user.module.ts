import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeedService } from 'src/app/Services/feed.service';
import { CustomFilterPipe } from 'src/app/Pipes/custom-filter-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailFormComponent } from './components/email-form/email-form.component';
import { MatDialogModule } from '@angular/material/dialog';

import { NgxSpinnerModule } from 'ngx-spinner';
// import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';





@NgModule({
  declarations: [
    UserDashboardComponent,
    FooterComponent,
    HomeComponent,
    CustomFilterPipe,
    EmailFormComponent,
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxSpinnerModule,
    
    
    
  ],
  providers: [FeedService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserModule { }
