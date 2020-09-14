import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, DatabaseService],
})
export class BlogModule {}
