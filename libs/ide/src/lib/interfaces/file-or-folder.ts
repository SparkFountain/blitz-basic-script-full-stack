import { FileType } from '../types/file-type';

export interface FileOrFolder {
  type: FileType;
  name: string;
}
