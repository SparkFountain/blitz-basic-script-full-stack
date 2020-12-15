import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { LanguageController } from './language.controller';
import { LanguageService } from './language.service';

@Module({
  imports: [],
  controllers: [LanguageController],
  providers: [LanguageService, DatabaseService],
})
export class LanguageModule {}
