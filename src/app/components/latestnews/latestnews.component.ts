import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-latestnews',
  templateUrl: './latestnews.component.html',
  styleUrls: ['./latestnews.component.css']
})
export class LatestnewsComponent implements OnInit {
  totalCount!: number;
  next!: string;
  previous!: string;
  page = 1;
  currentPage!: number;

  constructor() { }

  ngOnInit(): void {
    this.totalCount = 30
    this.currentPage = 1
  }

}
