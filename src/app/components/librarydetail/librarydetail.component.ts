import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Audio } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';
import { API } from 'src/app/constants/urls';

@Component({
  selector: 'app-librarydetail',
  templateUrl: './librarydetail.component.html',
  styleUrls: ['./librarydetail.component.css'],
})
export class LibraryDetailComponent implements OnInit {
  content!: Audio;
  slug!: string;
  url!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentService: ContentsService
  ) {}

  ngOnInit(): void {
    this.url = API.FRONTEND_URL + this.router.url;
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';
      this.getLibraryDetails(this.slug);
    });
  }

  getLibraryDetails(slug: string) {
    this.contentService.getLibraryDetail(slug).subscribe((data) => {
      this.content = data;
    });
  }
}
