import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from 'src/app/constants/messages';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedPage!: string;
  isLoggedIn!: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private userService: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.selectedPage = this.activatedRoute.snapshot.url[0]?.path || 'home';

    // check if login
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }


  // sign out
  SignOut() {
    this.userService.removeAuthUser();
    this.toastr.warning(MESSAGES.SIGNOUT_SUCCESS);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}