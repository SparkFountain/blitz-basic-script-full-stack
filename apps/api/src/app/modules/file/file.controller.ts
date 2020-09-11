import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiResponse, STATUS_SUCCESS } from '@blitz-basic-script/api-interfaces';
import { FileService } from './file.service';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('files')
  getFiles(): ApiResponse<string[]> {
    return {
      status: STATUS_SUCCESS,
      data: []
    };
  }

  @Get('files/file-size')
  getFileSize(@Query('path') path: string): ApiResponse<string[]> {
    return {
      status: STATUS_SUCCESS,
      data: []
    };;
  }

  @Get('files/file-type')
  getFileType(@Query('path') path: string): ApiResponse<string[]> {
    return {
      status: STATUS_SUCCESS,
      data: []
    };
  }

  @Get('files/get-content')
  getFileContent(@Query('path') path: string): ApiResponse<string> {
    return {
      status: STATUS_SUCCESS,
      data: ''
    };
  }
}
