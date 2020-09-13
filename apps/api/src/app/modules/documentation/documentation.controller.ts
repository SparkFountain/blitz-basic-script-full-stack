import { Controller, Get, Param, Query } from '@nestjs/common';

import { ApiResponse, STATUS_FAIL, STATUS_SUCCESS } from '@blitz-basic-script/api-interfaces';
import { DocumentationService } from './documentation.service';

import {
  GeneralCategory,
  KeywordCategory,
  CommandCategory,
  CommandPreview,
  Breadcrumb,
  NavigationElement,
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

  @Get('docs/breadcrumbs/:level1?/:level2?/:level3?/:level4?')
  getBreadcrumbs(
    @Query('language') language: string,
    @Param('level1') level1?: string,
    @Param('level2') level2?: string,
    @Param('level3') level3?: string,
    @Param('level4') level4?: string
  ): ApiResponse<Breadcrumb[]> {
    const data: Breadcrumb[] = [];

    switch(language) {
      case 'en':
        data.push({
          'title': 'Overview',
          'path': '/documentation'
        });
        break;
      case 'de':
        data.push({
          'title': 'Übersicht',
          'path': '/dokumentation'
        });
    }

    if(level1) {
      switch(level1) {
        case 'keywords':
          switch(language) {
            case 'en':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Keywords',
                  'path': '/documentation/keywords'
                }]
              }
            case 'de':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Schlüsselwörter',
                  'path': '/dokumentation/schluesselwoerter'
                }]
              }
          }
          break;
        case 'commands':
          switch(language) {
            case 'en':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Commands',
                  'path': '/documentation/commands'
                }]
              }
            case 'de':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Befehle',
                  'path': '/dokumentation/befehle'
                }]
              }
          }
          break;
        case 'constants-and-scancodes':
          switch(language) {
            case 'en':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Constants and Scancodes',
                  'path': '/documentation/constants-and-scancodes'
                }]
              }
            case 'de':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Konstanten und Scancodes',
                  'path': '/dokumentation/konstanten-und-scancodes'
                }]
              }
          }
          break;
        case 'differences-to-blitz-basic':
          switch(language) {
            case 'en':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Differences to BlitzBasic',
                  'path': '/documentation/differences-to-blitz-basic'
                }]
              }
            case 'de':
              return {
                status: STATUS_SUCCESS,
                data: [{
                  'title': 'Unterschiede zu BlitzBasic',
                  'path': '/dokumentation/unterschiede-zu-blitz-basics'
                }]
              }
          }
          break;
      }
    }

    if(level2) {

    }

    if(level3) {

    }

    return {
      status: STATUS_SUCCESS,
      data
    };
  }

  @Get('docs/navigation/:level1?/:level2?/:level3?')
  getNavigation(
    @Query('language') language: string,
    @Param('level1') level1?: string,
    @Param('level2') level2?: string,
    @Param('level3') level3?: string
  ): Promise<ApiResponse<NavigationElement[]>> {
    const data: NavigationElement[] = [];

    if (!level1) {
      // level 0
      switch(language) {
        case 'en':
          data.push({
            'title': 'Keywords',
            'path': '/documentation/keywords'
          });
          data.push({
            'title': 'Commands',
            'path': '/documentation/commands'
          });
          data.push({
            'title': 'Constants and Scancodes',
            'path': '/documentation/constants-and-scancodes'
          });
          data.push({
            'title': 'Differences to BlitzBasic',
            'path': '/documentation/differences-to-blitz-basic'
          });
          break;
        case 'de':
          data.push({
            'title': 'Schlüsselwörter',
            'path': '/dokumentation/schluesselwoerter'
          });
          data.push({
            'title': 'Befehle',
            'path': '/dokumentation/befehle'
          });
          data.push({
            'title': 'Unterschiede zu BlitzBasic',
            'path': '/dokumentation/unterschiede-zu-blitz-basic'
          });
      }
    } else if (!level2) {
      // level 1
      let fullPath: string;

      if (language === 'en') {
        fullPath = `/documentation/${level1}`;
      } else if (language === 'de') {
        fullPath = `/dokumentation/${level1}`;
      }

      // switch ($_GET['level1']) {
      // case 'keywords':
      // case 'schluesselwoerter':
      //   $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `keyword_category`";
      //   $result = $dbLanguage->query($sql);

      //   while ($row = $result->fetch_assoc()) {
      //     array_push(data, array(
      //       'title': $row['title'],
      //       'path': fullPath . '/' . $row['path'],
      //     ));
      //   }
      //   break;
      // case 'commands':
      // case 'befehle':
      //   $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `parent` IS NULL";
      //   $result = $dbLanguage->query($sql);

      //   while ($row = $result->fetch_assoc()) {
      //     // filter network category (not supported yet)
      //     if ($row['title'] !== 'Network' && $row['title'] !== 'Netzwerk') {
      //       array_push(data, array(
      //         'title': $row['title'],
      //         'path': fullPath . '/' . $row['path'],
      //       ));
      //     }
      //   }
      //   break;
      // case 'constants-and-scancodes':
      // case 'konstanten-und-scancodes':
      //   // TODO: implement
      //   break;
      // case 'differences-to-blitz-basic':
      // case 'unterschiede-zu-blitz-basics':
      //   // TODO: implement
      //   break;
      // }
    } else if (!level3) {
      // level 2
      // if ($languageKey === 'en') {
      //   fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'];
      // } elseif ($languageKey === 'de') {
      //   fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'];
      // }

      // switch ($_GET['level1']) {
      // case 'keywords':
      // case 'schluesselwoerter':
      //   $sql = "SELECT k.`name` FROM `keyword_category` cat, `keyword` k ";
      //   $sql .= "WHERE cat.`path_$languageKey` = '" . $_GET['level2'] . "' ";
      //   $sql .= "AND cat.`id` = k.`category_id`";
      //   $result = $dbLanguage->query($sql);

      //   while ($row = $result->fetch_assoc()) {
      //     array_push(data, array(
      //       'title': $row['name'],
      //       'path': fullPath . '/' . strtolower($row['name']),
      //     ));
      //   }
      //   break;
      // case 'commands':
      // case 'befehle':
      //   $sql = "SELECT cc.`title_$languageKey` as `title`, cc.`path_$languageKey` as `path` FROM `command_category` cp, `command_category` cc ";
      //   $sql .= "WHERE cp.`path_$languageKey` = '" . $_GET['level2'] . "' ";
      //   $sql .= "AND cc.`parent` = cp.`id`";
      //   $result = $dbLanguage->query($sql);

      //   while ($row = $result->fetch_assoc()) {
      //     array_push(data, array(
      //       'title': $row['title'],
      //       'path': fullPath . '/' . $row['path'],
      //     ));
      //   }
      //   break;
      // }
    } else {
      // level 3
      // if ($languageKey === 'en') {
      //   fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
      // } elseif ($languageKey === 'de') {
      //   fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
      // }

      // $sql = "SELECT cmd.`name` FROM `command_category` cat, `command` cmd ";
      // $sql .= "WHERE cat.`path_$languageKey` = '" . $_GET['level3'] . "' ";
      // $sql .= "AND cmd.`sub_category` = cat.`id`";
      // $result = $dbLanguage->query($sql);

      // while ($row = $result->fetch_assoc()) {
      //   array_push(data, array(
      //     'title': $row['name'],
      //     'path': fullPath . '/' . strtolower($row['name']),
      //   ));
      // }
    }

    // TODO: refactor
    return Promise.resolve({
      status: STATUS_SUCCESS,
      data
    });
  }

  @Get('docs/commands')
  getCommands(
    @Query('category') category,
    @Query('subCategory') subCategory,
    @Query('command') command,
    @Query('language') language
  ): ApiResponse<NavigationElement[]> {
    return null;
  }

  @Get('docs/search')
  searchTerms(): ApiResponse<any> {
    return null;
  }
}
