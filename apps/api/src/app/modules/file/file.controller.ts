import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('files')
  getFiles(): ApiResponse<string[]> {
    return null;
  }

  @Get('files/file-size')
  getFileSize(@Query('path') path: string): ApiResponse<string[]> {
    return null;
  }

  @Get('files/file-type')
  getFileType(@Query('path') path: string): ApiResponse<string[]> {
    return null;
  }

  @Get('files/get-content')
  getFileContent(@Query('path') path: string): ApiResponse<string> {
    return null;
  }
}
