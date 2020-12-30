import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { CombineLatestOperator } from 'rxjs/internal/observable/combineLatest';
import { Content } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css']
})
export class LatestnewsComponent implements OnInit {
  totalCount!: number;
  next!: string;
  previous!: string;
  page!: number;
  contents!: Content[];

  constructor(private route: ActivatedRoute, private contentService: ContentsService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => { this.page = params['page']; this.getContents(this.page || 1) })
  }

  getContents(page: number) {
    this.contentService.getContents(page).subscribe(contents => {
      this.next = contents.next;
      this.previous = contents.previous;
      this.totalCount = contents.count;
      this.contents = contents.results;
    })
  }

}
