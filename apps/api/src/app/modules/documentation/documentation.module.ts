import { Module } from '@nestjs/common';
import { DocumentationController } from './documentation.controller';
import { DocumentationService } from './documentation.service';

@Module({
  imports: [],
  controllers: [DocumentationController],
  providers: [DocumentationService],
})
export class DocumentationModule {}
