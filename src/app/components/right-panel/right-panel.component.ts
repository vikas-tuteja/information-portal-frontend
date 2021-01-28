import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { MESSAGES } from 'src/app/constants/messages';
import { Inventory } from 'src/app/models/shared';
declare var $: any;

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css'],
})
export class RightPanelComponent implements OnInit {
  isLoggedIn!: boolean;
  inventory!: Inventory;

  constructor(
    private sharedService: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // check if login
    this.isLoggedIn = this.sharedService.isLoggedIn();

    $(document).ready(function () {
      $('.desktop-badge').click(function (this: any) {
        this.addClass('active');
      });
    });

    this.getInventory();
  }

  donate() {
    this.toastr.warning(MESSAGES.DONATE_COMING_SOON);
  }

  getInventory() {
    this.sharedService.getInventoryDetails().subscribe((data) => {
      this.inventory = data;
    });
  }
}
