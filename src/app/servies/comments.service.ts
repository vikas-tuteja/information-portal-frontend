import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CONSTANTS } from '../constants/constants';
import { API } from '../constants/urls';
import { Comments } from '../models/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  /** GET comments list from the server */
  getComments(
    post_type: string,
    post_id: string,
    pageSize: number = CONSTANTS.PAGE_SIZE
  ): Observable<Comments> {
    return this.http.get<Comments>(
      API.GET_COMMENTS_LIST(post_type, post_id, pageSize)
    );
  }

  /** Create Like/Comment on the server */
  CreateReaction(data: any): Observable<Comment> {
    return this.http.post<Comment>(API.CREATE_REACTION(), data).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }

  /** DELETE comment from the server */
  editReaction(reactionId: number, data: any): Observable<Comment> {
    return this.http.patch<Comment>(API.EDIT_REACTION(reactionId), data);
  }

  /** DELETE comment from the server */
  deleteReaction(reactionId: number): Observable<Comment> {
    return this.http.delete<Comment>(API.DELETE_REACTION(reactionId)).pipe(
      tap(() => {
        this.refreshNeeded$.next();
      })
    );
  }
}
