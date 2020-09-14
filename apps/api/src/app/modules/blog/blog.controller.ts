import { Controller, Get, Query } from '@nestjs/common';

import { BlogService } from './blog.service';
import { BlogEntry } from '@blitz-basic-script/blog';
import { ApiResponse, STATUS_SUCCESS } from '@blitz-basic-script/api-interfaces';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('blog')
  getBlogEntries(
    @Query('page') page: number
  ): any {
    return this.blogService.getBlogEntries(page).then((blogEntries: BlogEntry[]) => {
      return {
        status: STATUS_SUCCESS,
        data: blogEntries
      }
    });
  }

  @Get('blog/total-pages')
  getTotalPages(): any {
    return this.blogService.getTotalPages().then((pages: number) => {
      return {
        status: STATUS_SUCCESS,
        data: pages
      }
    });
  }
}
