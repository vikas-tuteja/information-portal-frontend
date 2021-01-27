import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
  selector: 'app-latestnewsdetail',
  templateUrl: './contentdetail.component.html',
  styleUrls: ['./contentdetail.component.css'],
})
export class ContentDetailComponent implements OnInit {
  slug!: string;
  preview: boolean = false;
  contentDetail!: SafeHtml;
  title!: string;
  createdAt!: Date;
  author!: string;
  views!: number;
  url!: string;
  is_fake!: boolean;
  id!: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentsService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.url = this.router.url;
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe(
      (combined) => {
        const params = combined[0];
        const qparams = combined[1];

        this.slug = params.get('slug') || '';
        this.preview = Boolean(qparams.get('preview')) || this.preview;
        this.getContentDetail(this.slug, this.preview);
      }
    );
  }

  getContentDetail(slug: string, preview: boolean) {
    this.contentService.getContenDetail(slug, preview).subscribe((data) => {
      this.contentDetail = this.domSanitizer.bypassSecurityTrustHtml(
        data.content
      );
      this.title = data.title;
      this.author = data.author;
      this.createdAt = data.created_at;
      this.views = data.views;
      this.is_fake = data.is_fake;
      this.id = data.id;
    });
  }
}
