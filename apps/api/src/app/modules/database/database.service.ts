import { Injectable } from '@nestjs/common';
import { environment } from 'apps/api/src/environments/environment';

import * as pouch from 'pouchdb';

const PouchDB: PouchDB.Static = (pouch as any).default;

@Injectable()
export class DatabaseService {
  private db: any;

  constructor() {
    this.db = {
      commands: new PouchDB(environment.database.commands.url, {
        auth: {
          username: environment.database.username,
          password: environment.database.password,
        },
      }),
      keywords: new PouchDB(environment.database.keywords.url, {
        auth: {
          username: environment.database.username,
          password: environment.database.password,
        },
      }),
      documentation: new PouchDB(environment.database.documentation.url, {
        auth: {
          username: environment.database.username,
          password: environment.database.password,
        },
      }),
      user: new PouchDB(environment.database.user.url, {
        auth: {
          username: environment.database.username,
          password: environment.database.password,
        },
      }),
      blog: new PouchDB(environment.database.blog.url, {
        auth: {
          username: environment.database.username,
          password: environment.database.password,
        },
      }),
    };
  }

  async get(dbName: string, id: string): Promise<any> {
    if (!this.db.hasOwnProperty(dbName)) {
      console.error(`[DATABASE SERVICE] Database '${dbName}' does not exist`);
      return Promise.resolve(null);
    }

    return this.db[dbName]
      .get(id)
      .then(({ _id, _rev, ...doc }: any) => doc)
      .catch((err: Error) => {
        console.error(err);
        return null;
      });
  }

  async getAll(dbName: string): Promise<any> {
    if (!this.db.hasOwnProperty(dbName)) {
      console.error(`[DATABASE SERVICE] Database '${dbName}' does not exist`);
      return Promise.resolve(null);
    }

    return this.db[dbName]
      .allDocs({ include_docs: true })
      .then((docs: any) => {
        console.info('[ALL DOCS]', docs);
        // TODO: remove _id and _rev
        return docs.rows.map((doc: any) => doc.doc);
      })
      .catch((err: Error) => {
        console.error(err);
        return null;
      });
  }

  async countAll(dbName: string): Promise<number> {
    return this.db[dbName].allDocs().then((docs: any) => docs.total_rows);
  }

  async put(dbName: string, doc: any): Promise<any> {
    if (!this.db.hasOwnProperty(dbName)) {
      console.error(`[DATABASE SERVICE] Database '${dbName}' does not exist`);
      return Promise.resolve(null);
    }

    return this.db[dbName]
      .put(doc)
      .then((response: any) => {
        console.info('[PUT]', response);
      })
      .catch((err: Error) => {
        console.error(err);
        return null;
      });
  }
}
