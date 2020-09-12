import { Injectable } from '@nestjs/common';
import { environment } from 'apps/api/src/environments/environment';

import * as pouch from 'pouchdb';

const PouchDB: PouchDB.Static = (pouch as any).default;

@Injectable()
export class DatabaseService {
  private db: any;

  constructor() {
    this.db = new PouchDB(environment.database.url, {auth: {
      username: environment.database.username,
      password: environment.database.password
    }});
  }

  async get(id: string): Promise<any> {
    return this.db.get(id).then(({_id, _rev, ...doc}: any) => doc).catch((err: Error) => {
      console.error(err);
      return null;
    });
  }
}
