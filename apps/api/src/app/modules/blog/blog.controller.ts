import { Controller, Get } from '@nestjs/common';

import { BlogService } from './blog.service';
import { News } from '@blitz-basic-script/blog';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';

@Controller()
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('news')
  getNews(): ApiResponse<News> {
    return null;
  }

  @Get('news/total-pages')
  getTotalPages(): ApiResponse<number> {
    return null;
  }
}
