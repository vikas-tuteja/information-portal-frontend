import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  // to check all values in a hash and return false if any empty
  validate(data: any) {
    const vals = [...new Map(Object.entries(data)).values()];
    for (let index in vals) {
      if (vals[index] == '' || vals[index] == undefined || vals[index] == null) {
        return false;
      }
    }
    return true
  }

  // to check if TnC or any checkbox accepted
  validate_checkbox(id_name: string) {
    const elem = (document.getElementById(id_name) as HTMLInputElement)
    return elem.checked
  }

  // set user name and token in localstorage
  setAuthUser(response: any) {
    localStorage.setItem(
      'user',
      JSON.stringify({ token: response.token, name: response.name })
    );
  }

  // get username and token from localstorage
  getAuthUser() {
    return JSON.parse(
      localStorage.getItem('user') || '');
  }
}
