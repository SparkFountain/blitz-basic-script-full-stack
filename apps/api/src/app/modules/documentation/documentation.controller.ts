import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiResponse, STATUS_FAIL, STATUS_SUCCESS } from '@blitz-basic-script/api-interfaces';
import { DocumentationService } from './documentation.service';

import {
  GeneralCategory,
  KeywordCategory,
  CommandCategory,
  CommandPreview,
  Breadcrumb,
  Navigation,
} from '@blitz-basic-script/documentation';

@Controller()
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Get('docs/categories')
  getCategories(): Promise<ApiResponse<GeneralCategory[]>> {
    return this.documentationService.getCategories();
  }

  @Get('docs/categories/keywords')
  getKeywordCategories(): ApiResponse<KeywordCategory[]> {
    return null;
  }

  @Get('docs/categories/commands')
  getCommandCategoriesLevel1(): ApiResponse<CommandCategory[]> {
    return null;
  }

  @Get('docs/categories/commands/:level2')
  getCommandCategoriesLevel2(
    @Param('level2') level2: string
  ): ApiResponse<CommandCategory[]> {
    return null;
  }

  @Get('docs/categories/commands/:level2/:level3')
  getCommandCategoriesLevel3(
    @Param('level2') level2: string,
    @Param('level3') level3: string
  ): ApiResponse<CommandPreview[]> {
    return null;
  }

  @Get('docs/breadcrumbs')
  getBreadcrumbs(): ApiResponse<Breadcrumb[]> {
    return {
      status: STATUS_SUCCESS,
      data: []
    };
  }

  @Get('docs/navigation')
  getNavigation(): ApiResponse<Navigation[]> {
    return {
      status: STATUS_FAIL
    };
  }

  @Get('docs/commands')
  getCommands(
    @Query('category') category,
    @Query('subCategory') subCategory,
    @Query('command') command,
    @Query('language') language
  ): ApiResponse<Navigation[]> {
    return null;
  }

  @Get('docs/search')
  searchTerms(): ApiResponse<any> {
    return null;
  }
}
