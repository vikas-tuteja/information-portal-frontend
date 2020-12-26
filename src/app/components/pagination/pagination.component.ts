import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import {CONSTANTS} from 'src/app/constants/constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() public currentPage!: number;
  @Input() public totalCount!: number;
  @Input() public next!: string;
  @Input() public previous!: string;
  private totalPages!: number;
  private pageSize = CONSTANTS.PAGE_SIZE;
  pageDetails!: any[];
  private regExp!: RegExp;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.regExp = new RegExp('page=[0-9]+$');
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.pageDetails = this.preparePageDetails(this.totalPages);
  }

  preparePageDetails(n: number): any[] {
    let selected: string;
    const pageDetails: any[] = [];
    for (let index = 1; index <= n; index++) {
      if (index === this.currentPage) {
        selected = 'active';
      } else {
        selected = '';
      }
      pageDetails.push({
        page: index,
        link: this.prepareLinks(index),
        active: selected,
      });
    }
    return pageDetails;
  }

  prepareLinks(pageNumber: number = 1): string {
    // set page number in qp for every page link
    // TODO: next and previous links are not working
    if (!this.router.url.includes('page=')) {
      if (this.router.url.includes('?')) {
        return `${this.router.url}&page=${pageNumber}`;
      } else {
        return `${this.router.url}?page=${pageNumber}`;
      }
    }
    return this.router.url.replace(this.regExp, `page=${pageNumber}`);
  }
}