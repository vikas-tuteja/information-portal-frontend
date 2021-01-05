import { Component, OnInit } from '@angular/core';
import { Audio, Content } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  articles!: any[];
  blogs!: any[];
  news!: Content[];
  audioLibrary!: Audio[];
  no_of_cards = 3;

  constructor(
    private contentService: ContentsService
  ) { }

  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit(): void {
    // this.slides = this.chunk(this.cards, 3);
    // get articles
    this.contentService.getCategoryWiseContent('articles').subscribe(data => {
      this.articles = this.chunk(data.results, this.no_of_cards);
    });

    // get blogs
    this.contentService.getCategoryWiseContent('blogs').subscribe(data => {
      this.blogs = this.chunk(data.results, this.no_of_cards);
    });

    // get news
    this.contentService.getCategoryWiseContent('news').subscribe(data => {
      this.news = data.results;
    });

    // get audio librarys
    this.contentService.getCategoryWiseLibrary().subscribe(data => {
      this.audioLibrary = data.results;
    });
  }

}