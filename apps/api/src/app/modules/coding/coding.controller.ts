import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { CodingService } from './coding.service';

import { Template } from '@blitz-basic-script/coding';

@Controller()
export class CodingController {
  constructor(private readonly codingService: CodingService) {}

  @Get('/coding/templates')
  getTemplates(): ApiResponse<Template> {
    return null;
  }
}
