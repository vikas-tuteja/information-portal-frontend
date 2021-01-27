import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from 'src/app/constants/messages';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  private next!: string;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userSerivce: UserService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((qpMap) => {
      this.next = qpMap.get('next') || '/';
    });
  }

  signUpPostTrigger() {
    // get data first
    const data = this.getData();

    // check if postdata fields not null
    if (this.sharedService.validate(data) == false) {
      this.toastr.error(MESSAGES.REQUIRED_FIELDS_MISSING);
    }
    // check if TNC checked
    else if (this.sharedService.validate_checkbox('signup_checkbox') == false) {
      this.toastr.error(MESSAGES.TNC_CHECKBOX);
    }
    // post data
    else {
      this.userSerivce.signUpPost(data).subscribe((data) => {
        if (data.status == true) {
          this.userSerivce.setAuthUser(data);
          this.toastr.success(data.message);
          setTimeout(() => {
            window.location.href = this.next;
          }, 1500);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
    return false;
  }

  getData() {
    return {
      first_name: (document.getElementById('first_name') as HTMLInputElement)
        .value,
      last_name: (document.getElementById('last_name') as HTMLInputElement)
        .value,
      mobile: (document.getElementById('mobile') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value,
      confirm_password: (document.getElementById(
        'confirm_password'
      ) as HTMLInputElement).value,
    };
  }
}
