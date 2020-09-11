import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './modules/file/file.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { BlogModule } from './modules/blog/blog.module';
import { CodingModule } from './modules/coding/coding.module';
import { DocumentationModule } from './modules/documentation/documentation.module';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [AuthenticationModule, BlogModule, CodingModule, DocumentationModule, FileModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
