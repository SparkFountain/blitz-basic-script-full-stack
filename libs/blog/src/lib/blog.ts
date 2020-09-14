export interface BlogEntry {
  _id: number;  // TODO: move to PouchDB interface
  title: string;
  message: string;
  author: string;
  createdAt: Date;
  lastModifiedAt: Date;
  imageUrl: string;
}
