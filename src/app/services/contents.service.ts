import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API } from '../constants/urls';
import { ContentDetail, Contents } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  constructor(private http: HttpClient,
  ) { }

  /** GET products from the server */
  getContents(
    page: number = 1
  ): Observable<Contents> {
    return this.http
      .get<Contents>(
        API.GET_CONTENTS(
          page
        )
      )
      .pipe(
        tap((_) => this.log('fetched contents'))
      );
  }

  getContenDetail(
    slug: string
  ): Observable<ContentDetail> {
     return this.http
     .get<ContentDetail>(
       API.GET_CONTENT_DETAIL(
         slug
        )
      )
      .pipe(
        tap((_) => this.log('fetched content detail'))
      ) }

  private log(message: string) {
    console.log(message);
  }
}
