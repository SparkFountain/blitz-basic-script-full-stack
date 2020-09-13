import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { DatabaseService } from './modules/database/database.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly databaseService: DatabaseService) {}

  @Get('hello')
  getData(): string {
    return this.appService.getData();
  }
}
