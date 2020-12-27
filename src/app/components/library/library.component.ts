import { Component, OnInit } from '@angular/core';
// declare var $: any;

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
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
