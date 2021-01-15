import { Component, OnInit } from '@angular/core';
import { FAQs } from 'src/app/models/configmodels';
import { StaticpagesconfigService } from 'src/app/services/staticpagesconfig.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
})
export class FaqsComponent implements OnInit {
  faqs!: FAQs[];
  constructor(private faqsConfig: StaticpagesconfigService) {}

  ngOnInit(): void {
    this.faqsConfig.getFAQs().subscribe((data) => {
      this.faqs = data.results;
    });
  }
}
