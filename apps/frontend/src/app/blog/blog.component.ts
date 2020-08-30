import { Component, OnInit } from '@angular/core';

import { News } from '@blitz-basic-script/blog';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'blitz-basic-script-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  news: News[];
  pages: number[];
  currentPage: number;

  constructor(private newsBlogService: BlogService) {}

  ngOnInit(): void {
    this.news = [];
    this.pages = [1];
    this.currentPage = 1;

    this.getTotalPages();
    this.getNews();
  }

  getNews(): void {
    this.newsBlogService.get(this.currentPage).then((news: News[]) => {
      this.news = news;
      console.info('[NEWS]', this.news);
    });
  }

  getTotalPages(): void {
    this.newsBlogService.getTotalPages().then((totalPages: number) => {
      this.pages = Array(totalPages)
        .fill(1)
        .map((x, i) => i + 1);
    });
  }
}
