import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { ContentComponent } from './components/content/content.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LatestnewsComponent } from './components/latestnews/latestnews.component';
import { LatestnewsdetailComponent } from './components/latestnewsdetail/latestnewsdetail.component';
import { LibraryComponent } from './components/library/library.component';
import { OurmissionComponent } from './components/ourmission/ourmission.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'latest-news', component: LatestnewsComponent },
  { path: 'latest-news/:slug', component: LatestnewsdetailComponent },
  { path: 'audio-library', component: LibraryComponent },
  { path: 'content', component: ContentComponent },
  { path: 'our-mission', component: OurmissionComponent },
  { path: 'about-us', component: AboutusComponent },
  { path: 'contact-us', component: ContactusComponent },
  { path: 'faqs', component: FaqsComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
