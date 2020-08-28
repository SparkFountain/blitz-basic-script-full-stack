import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiResponse } from '@blitz-basic-script/api-interfaces';
import { ProjectService } from './project.service';

import { Project } from '@blitz-basic-script/project';

@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('projects')
  getFiles(): ApiResponse<Project> {
    return null;
  }


}
