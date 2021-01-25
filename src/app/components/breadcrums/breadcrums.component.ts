import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css'],
})
export class BreadcrumsComponent implements OnInit {
  firstBc: string = 'Home';
  bcList = new Array();

  constructor(private route: Router) {}

  ngOnInit(): void {
    const pages = this.route.url.substring(1).split('/');
    // debugger;
    for (let i = 0; i < pages.length; i++) {
      let currentPage;
      if (i === pages.length - 1) {
        currentPage = true;
      } else {
        currentPage = false;
      }
      switch (pages[i]) {
        case 'news':
          this.bcList.push({
            name: 'News',
            url: !currentPage ? '/news' : false,
          });
          break;
        case 'top-articles':
          this.bcList.push({
            name: 'Top Articles',
            url: !currentPage ? '/top-articles' : false,
          });
          break;
        case 'articles':
          this.bcList.push({
            name: 'Top Articles',
            url: !currentPage ? '/top-articles' : false,
          });
          break;
        // case 'popular-blogs':
        //   this.bcList.push({
        //     name: 'Popular Blogs',
        //     url: !currentPage ? '/popular-blogs' : false,
        //   });
        //   break;
        // case 'blogs':
        //   this.bcList.push({
        //     name: 'Popular Blogs',
        //     url: !currentPage ? '/popular-blogs' : false,
        //   });
        //   break;
        case 'audio-books':
          this.bcList.push({
            name: 'Audio Library',
            url: !currentPage ? '/audio-books' : false,
          });
          break;
        case 'our-mission':
          this.bcList.push({
            name: 'Our Mission',
            url: !currentPage ? '/our-mission' : false,
          });
          break;
        case 'about-us':
          this.bcList.push({
            name: 'About Us',
            url: !currentPage ? '/about-us' : false,
          });
          break;
        case 'contact-us':
          this.bcList.push({
            name: 'Contact Us',
            url: !currentPage ? '/contact-us' : false,
          });
          break;
        case 'faqs':
          this.bcList.push({ name: 'FAQs', url: !currentPage ? '/faqs' : '' });
          break;
        default:
          this.bcList.push({ name: pages[1], url: '' });
          break;
      }
    }
    console.log(this.bcList);
  }
}
