import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants/urls';
import { FAQsList } from '../models/configmodels';

@Injectable({
  providedIn: 'root',
})
export class StaticpagesconfigService {
  constructor(private http: HttpClient) {}

  /** GET faqs from the server */
  getFAQs(page: number = 1): Observable<FAQsList> {
    return this.http.get<FAQsList>(API.GET_FAQs);
  }
}
