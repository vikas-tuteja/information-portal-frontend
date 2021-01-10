import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Audio } from 'src/app/models/content';
import { ContentsService } from 'src/app/services/contents.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  totalCount!: number;
  next!: string;
  previous!: string;
  page! : number;
  audioLibrary!: Audio[];

  constructor(private route: ActivatedRoute,
    private contentService: ContentsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.page = parseInt(params['page'] || 1);
      this.getAudioLibrarys(this.page)
    })
  }


  // get audio librarys
  getAudioLibrarys(page: number) {
    this.contentService.getCategoryWiseLibrary().subscribe(data => {
      this.audioLibrary = data.results;
      this.next = data.next;
      this.previous = data.previous;
      this.totalCount = data.count;
    });
  }
}
