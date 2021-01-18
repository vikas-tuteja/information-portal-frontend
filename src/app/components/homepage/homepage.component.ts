import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Audio, ContentDetail } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomepageComponent implements OnInit {
  articles!: any[];
  blogs!: any[];
  news!: any[];
  newsDesktop!: ContentDetail[];
  audioLibrary!: Audio[];
  no_of_cards = 3;
  isLoggedIn!: boolean;

  isTablet: boolean = false;
  isDeskTop: boolean = false;

  constructor(
    private deviceService: DeviceDetectorService,
    private contentService: ContentsService,
    private sharedService: SharedService
  ) {}

  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    const isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();

    this.isDeskTop = this.deviceService.isDesktop();

    if (isMobile) {
      this.no_of_cards = 1;
    } else if (this.isTablet) {
      this.no_of_cards = 2;
    }

    // get articles
    this.contentService
      .getCategoryWiseContent(1, 'articles')
      .subscribe((data) => {
        this.articles = this.chunk(data.results, this.no_of_cards);
      });

    // get blogs
    this.contentService.getCategoryWiseContent(1, 'blogs').subscribe((data) => {
      this.blogs = this.chunk(data.results, this.no_of_cards);
    });

    // get news
    this.contentService.getCategoryWiseContent(1, 'news').subscribe((data) => {
      this.news = this.chunk(data.results, this.no_of_cards);
      this.newsDesktop = data.results;
    });

    // get audio librarys
    this.contentService.getCategoryWiseLibrary().subscribe((data) => {
      this.audioLibrary = data.results;

      // correct left and right arrow css at last
      this.correctArrowCss('left');
      this.correctArrowCss('right');
    });

    // cheked if login
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }

  correctArrowCss(side: any) {
    setTimeout(() => {
      const elems = document.getElementsByClassName('fa-chevron-' + side);
      for (let i = 0; i < elems.length; i++) {
        elems[i].classList.remove('fas');
        elems[i].classList.add('fa', 'blue', 'chev', 'chev-' + side);
      }
    }, 1000);
  }

  calculateClasses() {
    if (this.isTablet) {
      return 'col-md-6';
    } else if (this.isDeskTop) {
      return 'col-md-4';
    } else {
      return 'col-md-4';
    }
  }
}
