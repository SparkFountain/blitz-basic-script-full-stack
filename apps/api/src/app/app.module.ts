import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './modules/blog/blog.module';

@Module({
  imports: [BlogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
