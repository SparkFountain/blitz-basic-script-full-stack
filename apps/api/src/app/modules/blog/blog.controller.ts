import { Controller, Get } from '@nestjs/common';

import { BlogService } from './blog.service';
import { News } from '@blitz-basic-script/blog';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('blog')
  getNews(): ApiResponse<News> {
    return null;
  }

  @Get('blog/total-pages')
  getTotalPages(): ApiResponse<number> {
    return {
      status: 'success',
      data: 5,
    };
  }
}
