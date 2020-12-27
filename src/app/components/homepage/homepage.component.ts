import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  images!: any;
  constructor() { }

  ngOnInit(): void {
    this.images = ["", "/assets/images/sikh-farmer.jpeg", "/assets/images/farmer2.jpeg", "https://mdbootstrap.com/img/Photos/Lightbox/Thumbnail/img%20(147).jpg"];
  }

}
