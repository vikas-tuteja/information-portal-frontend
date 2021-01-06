import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API } from '../constants/urls';
import { Audio, AudioLibrary, ContentDetail, Contents } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  constructor(
    private http: HttpClient
  ) { }

  /** GET products from the server */
  getContents(page: number = 1
  ): Observable<Contents> {
    return this.http
      .get<Contents>(
        API.GET_CONTENTS(page)
      )
      .pipe(
        tap((_) => this.log('fetched contents'))
      );
  }

  getContenDetail(slug: string
  ): Observable<ContentDetail> {
    return this.http
      .get<ContentDetail>(
        API.GET_CONTENT_DETAIL(slug)
      )
      .pipe(
        tap((_) => this.log('fetched content detail'))
      )
  }

  getCategoryWiseContent(page: number, category_slug: string
  ): Observable<Contents> {
    return this.http
      .get<Contents>(
        API.GET_CATEGORY_WISE_CONTENT(page, category_slug)
      )
      .pipe(
        tap((_) => this.log('fetched contents'))
      )
  }

  getCategoryWiseLibrary(category_slug: string = ''
  ): Observable<AudioLibrary> {
    return this.http
      .get<AudioLibrary>(
        API.GET_CATEGORY_WISE_AUDIOLIBRARY(category_slug)
      )
      .pipe(
        tap((_) => this.log('fetched audio library'))
      )
  }

  getLibraryDetail(slug: string
  ): Observable<Audio> {
    return this.http
      .get<Audio>(
        API.GET_LIBRARY_DETAIL(slug)
      )
      .pipe(
        tap((_) => this.log('fetched library detail'))
      )
  }

  private log(message: string) {
    console.log(message);
  }
}
