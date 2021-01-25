import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ContentComponent } from './components/content/content.component';
import { ContentDetailComponent } from './components/contentdetail/contentdetail.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LibraryComponent } from './components/library/library.component';
import { LibraryDetailComponent } from './components/librarydetail/librarydetail.component';
import { OurmissionComponent } from './components/ourmission/ourmission.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  // home page
  { path: '', component: HomepageComponent },

  // news
  { path: 'news', component: ContentComponent },
  { path: 'news/:slug', component: ContentDetailComponent },

  // articles
  { path: 'top-articles', component: ContentComponent },
  { path: 'articles/:slug', component: ContentDetailComponent },

  // popular blogs
  // { path: 'popular-blogs', component: ContentComponent },
  // { path: 'blogs/:slug', component: ContentDetailComponent },

  // Audio Library
  { path: 'audio-books', component: LibraryComponent },
  { path: 'audio-books/:slug', component: LibraryDetailComponent },

  // static pages
  { path: 'our-mission', component: OurmissionComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'faqs', component: FaqsComponent },

  // signin signout
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
