import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/homepage/homepage.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { OurmissionComponent } from './components/ourmission/ourmission.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { LibraryComponent } from './components/library/library.component';
import { ContentComponent } from './components/content/content.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContentDetailComponent } from './components/contentdetail/contentdetail.component';
import { ToastrModule } from 'ngx-toastr';
import { LibraryDetailComponent } from './components/librarydetail/librarydetail.component';
import { BreadcrumsComponent } from './components/breadcrums/breadcrums.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    ContactusComponent,
    OurmissionComponent,
    FaqsComponent,
    ContentComponent,
    LibraryComponent,
    ContentComponent,
    SigninComponent,
    SignupComponent,
    PaginationComponent,
    RightPanelComponent,
    ContentDetailComponent,
    LibraryDetailComponent,
    BreadcrumsComponent,
    LoaderComponent,
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
