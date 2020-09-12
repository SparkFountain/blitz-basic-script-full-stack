import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { DocumentationController } from './documentation.controller';
import { DocumentationService } from './documentation.service';

@Module({
  imports: [],
  controllers: [DocumentationController],
  providers: [DocumentationService, DatabaseService],
})
export class DocumentationModule {}
