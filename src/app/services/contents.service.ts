import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { API } from '../constants/urls';
import { Contents } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  constructor(private http: HttpClient,
  ) { }

  /** GET products from the server */
  getContents(
    // categorySlug: string = '',
    // occasionSlug: string = '',
    // emotionSlug: string = '',
    // productForSlug: string = '',
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

  private log(message: string) {
    console.log(message);
  }
}
