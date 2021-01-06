const BACKEND_URL = 'http://localhost:8000/';

export class API {

  // public static GET_CONTENTS = BACKEND_URL + 'api/contents/';
  static GET_CONTENTS(page: number) {
    return `${BACKEND_URL}api/contents/?page=${page}`;
  }
  static GET_CONTENT_DETAIL(slug: string) {
    return `${BACKEND_URL}api/content/${slug}/`;
  }

  static GET_CATEGORY_WISE_CONTENT(page: number, category_slug: string) {
    return `${BACKEND_URL}api/contents/?page=${page}&category=${category_slug}`;
  }

  static GET_CATEGORY_WISE_AUDIOLIBRARY(category_slug: string = '') {
    return `${BACKEND_URL}api/librarys/?category=${category_slug}`;
  }

  static GET_LIBRARY_DETAIL(slug: string) {
    return `${BACKEND_URL}api/library/${slug}/`;
  }

  public static POST_SIGNUP = `${BACKEND_URL}myaccount/signup/`;
  public static POST_SIGNIN = `${BACKEND_URL}myaccount/signin/`;
}
