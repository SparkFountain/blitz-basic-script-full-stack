import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { BlogEntry } from '@blitz-basic-script/blog';
import { TranslocoService } from '@ngneat/transloco';
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

  @ViewChildren('blogEntriesRendered')
  blogEntriesRendered: QueryList<ElementRef>;

  constructor(
    private readonly blogService: BlogService,
    private readonly translocoService: TranslocoService
  ) {}

  ngOnInit(): void {
    this.language = this.translocoService.getActiveLang();
    this.languageSubscription = this.translocoService.langChanges$.subscribe(
      (event: any) => {
        this.language = event.lang;
        this.getBlogEntries(this.currentPage);
      }
    );
    this.dateFormat = this.translocoService.translate('BLOG.DATE_FORMAT');

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

  scrollToOffset(index: number): void {
    const renderedContainer: ElementRef<any> = this.blogEntriesRendered.toArray()[
      index
    ].nativeElement;

    (renderedContainer as any).scrollIntoView({ behavior: 'smooth' });
  }
}
