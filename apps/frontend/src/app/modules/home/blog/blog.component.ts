import { Component, OnDestroy, OnInit } from '@angular/core';

import { BlogEntry } from '@blitz-basic-script/blog';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'blitz-basic-script-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  language: string;
  languageSubscription: Subscription;
  dateFormat: string;

  blogEntries: BlogEntry[];
  pages: number[];
  currentPage: number;

  constructor(
    private readonly blogService: BlogService,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.language = this.translateService.currentLang;
    this.languageSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.language = event.lang;
        this.getBlogEntries(this.currentPage);
      }
    );
    this.dateFormat = this.translateService.instant('BLOG.DATE_FORMAT');

    this.blogEntries = [];
    this.pages = [1];
    this.currentPage = 1;

    this.getTotalPages();
    this.getBlogEntries(this.currentPage);
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  getBlogEntries(page: number): void {
    this.currentPage = page;
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

  formatDate(dateRaw: string): string {
    const date = new Date(dateRaw);

    const dayAsNumber = date.getDate();
    const day = dayAsNumber < 10 ? `0${dayAsNumber}` : dayAsNumber.toString();
    const monthAsNumber = date.getMonth() + 1;
    const month =
      monthAsNumber < 10 ? `0${monthAsNumber}` : monthAsNumber.toString();
    const year = date.getFullYear();

    return this.language === 'de'
      ? `${day}.${month}.${year}`
      : `${year}/${month}/${day}`;
  }
}
