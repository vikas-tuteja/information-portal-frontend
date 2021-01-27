import { Injectable } from '@angular/core';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private userService: UserService) {}

  // to check all values in a hash and return false if any empty
  validate(data: any) {
    const vals = [...new Map(Object.entries(data)).values()];
    for (let index in vals) {
      if (
        vals[index] == '' ||
        vals[index] == undefined ||
        vals[index] == null
      ) {
        return false;
      }
    }
    return true;
  }

  // to check if TnC or any checkbox accepted
  validate_checkbox(id_name: string) {
    const elem = document.getElementById(id_name) as HTMLInputElement;
    return elem.checked;
  }

  // check if logged in
  isLoggedIn() {
    const userObj = this.userService.getAuthUser();
    return !(
      userObj?.token === '' ||
      userObj?.token === undefined ||
      userObj?.token === null
    );
  }

  // returns closure function case insentive highlight
  //  string of searched characters
  highlightText(search: string) {
    const search_length = search.length;

    function inner(original: string) {
      const start = original.toLowerCase().indexOf(search.toLowerCase());
      const end = start + search_length;

      return (
        original.substring(0, start) +
        '<span class="strong">' +
        original.substring(start, end) +
        '</span>' +
        original.substring(end)
      );
    }
    return inner;
  }
}
