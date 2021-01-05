import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignUp } from '../models/user';
import { API } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  signUpPost(data: any): Observable<any> {
    return this.http.post(API.POST_SIGNUP, data);
  }

  signInPost(data: any): Observable<any> {
    return this.http.post(API.POST_SIGNIN, data);
  }
}
