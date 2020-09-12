import { ApiResponse, STATUS_SUCCESS } from '@blitz-basic-script/api-interfaces';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DocumentationService {
  constructor(private readonly databaseService: DatabaseService) {

  }

  getCategories(): Promise<ApiResponse<any>> {
    return this.databaseService.get('basics').then((doc: any) => {
      return {
        status: STATUS_SUCCESS,
        data: doc
      }
    });
  }
}
