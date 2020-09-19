import { Injectable } from '@nestjs/common';
import { environment } from 'apps/api/src/environments/environment';
import { BlogEntry } from 'libs/blog/src/lib/blog';

import * as pouch from 'pouchdb';
import { anchor } from 'pouchdb-find';

const PouchDB: PouchDB.Static = (pouch as any).default;

@Injectable()
export class BlogService {
  private db: any;

  constructor() {
    this.db = new PouchDB(environment.database.blog.url, {
      auth: {
        username: environment.database.username,
        password: environment.database.password,
      },
    });
  }

  async getAll(): Promise<any> {
    return this.db
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

  async countAll(): Promise<number> {
    return this.db.allDocs().then((docs: any) => docs.total_rows);
  }

  async getSortedByDate(): Promise<any> {
    return this.db
      .query('blog/by-date?descending=true')
      .then((response: any) => {
        return response.rows.map((row: any) => row.value);
      })
      .catch(function (error: Error) {
        console.error('[VIEW ERROR]', error);
      });
  }

  async put(doc: any): Promise<any> {
    return this.db
      .put(doc)
      .then((response: any) => {
        console.info('[PUT]', response);
      })
      .catch((err: Error) => {
        console.error(err);
        return null;
      });
  }

  getTotalPages(): Promise<number> {
    return this.countAll().then((blogEntryAmount: number) =>
      Math.ceil(blogEntryAmount / 10)
    );
  }

  getBlogEntries(page: number): Promise<BlogEntry[]> {
    return this.getSortedByDate().then((response: any[]) => {
      const entries: BlogEntry[] = response.map(({ _id, _rev, ...doc }) => doc);
      console.info((page - 1) * 10, page * 10);
      return entries.slice((page - 1) * 10, page * 10);
    });
  }
}
