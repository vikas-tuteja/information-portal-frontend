const BACKEND_URL = 'http://localhost:8000/';

export class API {
  
    // public static GET_CONTENTS = BACKEND_URL + 'api/contents/';
    static GET_CONTENTS(page: number) {
      return `${BACKEND_URL}api/contents?page=${page}`;
    }
    static GET_CONTENT_DETAIL(slug: string) {
      return `${BACKEND_URL}api/content/${slug}`;
    }
}  
