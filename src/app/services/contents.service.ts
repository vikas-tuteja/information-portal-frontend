import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API } from '../constants/urls';
import {
  Audio,
  AudioLibrary,
  ContentDetail,
  Contents,
  SearchList,
} from '../models/content';

@Injectable({
  providedIn: 'root',
})
export class ContentsService {
  constructor(private http: HttpClient) {}

  /** GET products from the server */
  getContents(page: number = 1): Observable<Contents> {
    return this.http
      .get<Contents>(API.GET_CONTENTS(page))
      .pipe(tap((_) => this.log('fetched contents')));
  }

  getContenDetail(slug: string, preview: boolean): Observable<ContentDetail> {
    return this.http
      .get<ContentDetail>(API.GET_CONTENT_DETAIL(slug, preview))
      .pipe(tap((_) => this.log('fetched content detail')));
  }

  getCategoryWiseContent(
    page: number,
    category_slug: string
  ): Observable<Contents> {
    return this.http
      .get<Contents>(API.GET_CATEGORY_WISE_CONTENT(page, category_slug))
      .pipe(tap((_) => this.log('fetched contents')));
  }

  getCategoryWiseLibrary(category_slug: string = ''): Observable<AudioLibrary> {
    return this.http
      .get<AudioLibrary>(API.GET_CATEGORY_WISE_AUDIOLIBRARY(category_slug))
      .pipe(tap((_) => this.log('fetched audio library')));
  }

  getLibraryDetail(slug: string): Observable<Audio> {
    return this.http
      .get<Audio>(API.GET_LIBRARY_DETAIL(slug))
      .pipe(tap((_) => this.log('fetched library detail')));
  }

  getSearchList(search_string: string): Observable<SearchList> {
    return this.http.get<SearchList>(API.GET_SEARCH_LIST(search_string));
  }

  private log(message: string) {
    console.log(message);
  }
}
