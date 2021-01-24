// const BACKEND_URL = 'http://localhost:8000/';
const FRONTEND_URL = 'http://ec2-18-204-231-217.compute-1.amazonaws.com/';
const BACKEND_URL = 'http://ec2-18-204-231-217.compute-1.amazonaws.com:8080/';

export class API {
  // public static GET_CONTENTS = BACKEND_URL + 'api/contents/';
  static GET_CONTENTS(page: number) {
    return `${BACKEND_URL}api/contents/?page=${page}`;
  }

  static GET_CONTENT_DETAIL(slug: string, preview: boolean = false) {
    if (preview === true) {
      return `${BACKEND_URL}api/content/${slug}/?preview=true`;
    } else {
      return `${BACKEND_URL}api/content/${slug}/`;
    }
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

  static GET_SEARCH_LIST(search_string: string) {
    return `${BACKEND_URL}api/search/?search_string=${search_string}`;
  }

  public static POST_SIGNUP = `${BACKEND_URL}myaccount/signup/`;
  public static POST_SIGNIN = `${BACKEND_URL}myaccount/signin/`;

  public static GET_FAQs = `${BACKEND_URL}api/faqs/`;
  public static FRONTEND_URL = FRONTEND_URL;
}
