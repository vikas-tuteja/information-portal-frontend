import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isLoggedIn!: boolean;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    // check if login
    this.isLoggedIn = this.sharedService.isLoggedIn();
  }
}
