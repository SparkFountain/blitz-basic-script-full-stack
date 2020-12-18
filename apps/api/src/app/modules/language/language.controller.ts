import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiCommand,
  ApiResponse,
  STATUS_SUCCESS,
} from '@blitz-basic-script/api-interfaces';

import { LanguageService } from './language.service';

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
