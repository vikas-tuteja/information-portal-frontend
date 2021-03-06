import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ContentDetail } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  totalCount!: number;
  next!: string;
  previous!: string;
  page!: number;
  contents!: ContentDetail[];
  category!: string;
  urlPath!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contentService: ContentsService
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap]
    ).subscribe(combined => {
      const params = combined[0];
      const qparams = combined[1];

      this.page = parseInt(qparams.get('page') || '1');
      const url = this.router.url;
      if (url == '/top-articles') {
        this.category = 'articles'
        this.urlPath = 'articles'
      } 
      // else if (url == '/popular-blogs') {
      //   this.category = 'blogs'
      //   this.urlPath = 'blogs'
      // }
       else {
        this.category = 'news'
        this.urlPath = 'news'
      }
      this.getContents(this.page, this.category);
    });
  }

  getContents(page: number, category: string) {
    this.contentService.getCategoryWiseContent(page, category
    ).subscribe(contents => {
      this.next = contents.next;
      this.previous = contents.previous;
      this.totalCount = contents.count;
      this.contents = contents.results;
    })
  }
}
