import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Audio, ContentDetail } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  articles!: any[];
  blogs!: any[];
  news!: any[];
  newsDesktop! : ContentDetail[];
  audioLibrary!: Audio[];
  no_of_cards = 3;
  isLoggedIn!: boolean;

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
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();

    if(isMobile) {
      this.no_of_cards = 1
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
    });

    // cheked if login
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }
}
