import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from 'src/app/constants/messages';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // check if login
    debugger;
    
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }

  donate(){
    this.toastr.warning(MESSAGES.DONATE_COMING_SOON);
  }

}
