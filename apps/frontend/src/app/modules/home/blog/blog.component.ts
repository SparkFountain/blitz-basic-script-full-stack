import { Component, OnInit } from '@angular/core';

import { BlogEntry } from '@blitz-basic-script/blog';
import { TranslateService } from '@ngx-translate/core';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'blitz-basic-script-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  language: string;

  blogEntries: BlogEntry[];
  pages: number[];
  currentPage: number;

  constructor(private readonly blogService: BlogService, private readonly translateService: TranslateService) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;

    this.blogEntries = [];
    this.pages = [1];
    this.currentPage = 1;

    this.getTotalPages();
    this.getBlogEntries();
  }

  getBlogEntries(): void {
    this.blogService.get(this.currentPage).then((blogEntries: BlogEntry[]) => {
      this.blogEntries = blogEntries;
      console.info('[BLOG ENTRIES]', this.blogEntries);
    });
  }

  getTotalPages(): void {
    this.blogService.getTotalPages().then((totalPages: number) => {
      this.pages = Array(totalPages)
        .fill(1)
        .map((x, i) => i + 1);
    });
  }
}
