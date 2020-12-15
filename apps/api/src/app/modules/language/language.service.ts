import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ApiCommand } from '@blitz-basic-script/game';

@Injectable()
export class LanguageService {
  constructor(private dbService: DatabaseService) {}

  getCommand(name: string): Promise<ApiCommand> {
    console.info('[GET COMMAND]', name);

    return this.dbService.get('commands', name.toLowerCase());
  }
}
