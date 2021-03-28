import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from 'src/app/models/comments';
import { CommentsService } from 'src/app/servies/comments.service';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from 'src/app/constants/messages';
import { SharedService } from 'src/app/services/shared.service';
import { CONSTANTS } from 'src/app/constants/constants';
import { UserService } from 'src/app/services/user.service';
declare var $: any;

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() postType!: string;
  @Input() postId!: string;

  comments!: Comment[];
  totalLikes!: number;
  totalComments!: number;
  totalCommentsInDB!: number;
  pageSize!: number;
  canLike!: boolean;
  reactionId!: number;
  isLoggedIn!: boolean;
  url!: string;
  loggedInUser: any;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commentsService: CommentsService,
    private sharedService: SharedService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // currentUrl
    this.url = this.router.url;

    // check if login
    this.isLoggedIn = this.sharedService.isLoggedIn();
    this.loggedInUser = this.userService.getAuthUser();

    // get comments list
    this.route.queryParamMap.subscribe((qpMap) => {
      // this.page = parseInt(qpMap.get('page') || '1');
      this.getCommentsList();
    });

    this.commentsService.refreshNeeded$.subscribe(() => {
      this.getCommentsList();
    });
  }

  getCommentsList() {
    this.commentsService
      .getComments(this.postType, this.postId, this.pageSize)
      .subscribe((data) => {
        this.comments = data.results;
        this.totalLikes = data.total_likes;
        this.totalComments = data.results.length;
        this.canLike = data.can_like;
        this.totalCommentsInDB = data.count;
      });
  }

  // create Like/Comment post
  createReaction(activityType: string) {
    var data = {
      content_type: this.postType,
      object_id: this.postId,
    };
    var partData;
    if (activityType == 'Comment') {
      const text = (document.getElementById('comment') as HTMLInputElement)
        .value;
      if (text.length < 3) {
        this.toastr.error(MESSAGES.COMMENT_MIN_LENGTH);
        return false;
      }
      partData = {
        activity_type: 'Comment',
        text: text,
      };
    } else if (activityType == 'Like') {
      partData = {
        activity_type: 'Like',
      };
    }

    this.commentsService
      .CreateReaction({ ...data, ...partData })
      .subscribe((resp) => {
        if (activityType == 'Comment') {
          (document.getElementById('comment') as HTMLInputElement).value = '';
          this.toastr.success(MESSAGES.COMMENT_POSTED_SUCCESSFULLY);
        } else if (activityType == 'Like') {
          const tl = document.getElementById('totalLikes') as HTMLDivElement;
          if (tl) tl.innerHTML = `${this.totalLikes + 1}`;
        }
      });
    return true;
  }

  // set reaction id to be delete on clicking trash icon
  setDeleteConfirmation(elem: any) {
    const obj = elem.target;
    this.reactionId = obj.getAttribute('data-reactionId');
  }

  // call delete API once confirmed
  deleteComment() {
    this.commentsService.deleteReaction(this.reactionId).subscribe((data) => {
      $('#closeButton').click();
      this.toastr.success(MESSAGES.COMMENT_DELETED_SUCCESSFULLY);
    });
  }

  // alreadyLike
  cannotLike() {
    if (this.isLoggedIn) {
      this.toastr.warning(MESSAGES.ALREADY_LIKE);
    } else {
      this.toastr.warning(MESSAGES.LOGIN_TO_LIKE);
    }
  }

  // load More Commments -> reload with more page size
  loadMoreCommments() {
    this.pageSize = this.totalComments + CONSTANTS.PAGE_SIZE;
    this.commentsService.refreshNeeded$.next();
  }
}
