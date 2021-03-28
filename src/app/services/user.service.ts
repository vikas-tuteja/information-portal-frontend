import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignUp } from '../models/user';
import { API } from '../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // signup post form
  signUpPost(data: any): Observable<any> {
    return this.http.post(API.POST_SIGNUP, data);
  }

  // sigin post form
  signInPost(data: any): Observable<any> {
    return this.http.post(API.POST_SIGNIN, data);
  }

  // set user name and token in localstorage
  setAuthUser(response: any) {
    localStorage.setItem(
      'user',
      JSON.stringify({
        token: response.token,
        name: response.name,
        id: response.id,
      })
    );
  }

  // get username and token from localstorage
  getAuthUser() {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    } else {
      return {};
    }
  }

  // remove auth user
  removeAuthUser() {
    localStorage.removeItem('user');
  }
}
