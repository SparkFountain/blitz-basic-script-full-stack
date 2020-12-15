import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiResponse,
  STATUS_SUCCESS,
} from '@blitz-basic-script/api-interfaces';

import { LanguageService } from './language.service';
import { ApiCommand } from '@blitz-basic-script/game';

@Controller('/language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get('/command')
  getCommand(@Query('name') name: string): Promise<ApiResponse<ApiCommand>> {
    return this.languageService
      .getCommand(name)
      .then((command: ApiCommand) => ({
        status: STATUS_SUCCESS,
        data: command,
      }));
  }
}
