import { Injectable } from '@nestjs/common';
import { BlogEntry } from 'libs/blog/src/lib/blog';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BlogService {
  constructor(private readonly databaseService: DatabaseService) {}

  getTotalPages(): Promise<number> {
    return this.databaseService.countAll('blog').then((blogEntryAmount: number) => Math.ceil(blogEntryAmount / 10));
  }

  getBlogEntries(page: number): Promise<BlogEntry[]> {
    let minIndex: number;
    let maxIndex: number;

    return this.databaseService.countAll('blog')
      .then((blogEntryAmount: number) => {
        maxIndex = blogEntryAmount; // TODO: fix
        minIndex = blogEntryAmount - 9;
        return this.databaseService.getAll('blog');
      })
      .then((blogEntries: BlogEntry[]) => {
        // TODO: sort by id
        return blogEntries.filter((blogEntry: BlogEntry) => blogEntry._id >= minIndex && blogEntry._id <= maxIndex);
      });
  }
}
