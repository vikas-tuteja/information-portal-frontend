import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
  selector: 'app-latestnewsdetail',
  templateUrl: './contentdetail.component.html',
  styleUrls: ['./contentdetail.component.css']
})
export class ContentDetailComponent implements OnInit {
  slug!: string;
  contentDetail!: SafeHtml;
  title!: string;
  createdAt!: Date;
  author!: string;
  views!: number;
  url!: string;
  is_fake!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentsService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.url = this.router.url;
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
      this.getContentDetail(this.slug);
    })
  }

  getContentDetail(slug: string) {
    this.contentService.getContenDetail(slug).subscribe(data => {
      this.contentDetail = this.domSanitizer.bypassSecurityTrustHtml(data.content);
      this.title = data.title;
      this.author = data.author;
      this.createdAt = data.created_at;
      this.views = data.views;
      this.is_fake = data.is_fake;
    });
  }
}
