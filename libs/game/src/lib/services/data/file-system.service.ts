import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BbScriptStream } from 'bbscript/src/classes/in-game/data/stream';
import { GameStateService } from '../../game-state.service';
import { BbScriptDirectory } from 'bbscript/src/classes/in-game/data/directory';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from 'bbscript/src/interfaces/api/api-response';
import { BbScriptFileType } from 'bbscript/src/enums/in-game/file-system/file-type';

@Injectable()
export class CommandsDataFileSystemService {
  constructor(private gameState: GameStateService, private http: HttpClient) {}

  async changeDir(path: string): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      this.gameState.changeDirectory(path);
    });
  }

  async closeDir(directory: BbScriptDirectory): Promise<void> {
    directory = null;
  }

  async closeFile(stream: BbScriptStream): Promise<void> {
    stream = null;
  }

  async copyFile(sourcePath: string, targetPath: string): Promise<void> {
    const body = new HttpParams().set('sourcePath', sourcePath).set('targetPath', targetPath);
    return this.http.post<void>(`${environment.apiServer}/files/copy-file`, body).toPromise();
  }

  async createDir(path: string): Promise<any> {
    const body = new HttpParams().set('path', path);
    return this.http.post<void>(`${environment.apiServer}/files/create-directory`, body).toPromise();
  }

  async currentDir(): Promise<string> {
    return this.gameState.fileSystem.currentDirectory;
  }

  async deleteDir(path: string): Promise<void> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: new HttpParams().set('path', path)
    };
    return this.http.delete<void>(`${environment.apiServer}/files/delete-directory`, options).toPromise();
  }

  async deleteFile(path: string): Promise<void> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: new HttpParams().set('path', path)
    };
    return this.http.delete<void>(`${environment.apiServer}/files/delete-file`, options).toPromise();
  }

  async eof(stream: BbScriptStream): Promise<-1 | 0 | 1> {
    // TODO: error handling and return type (should be boolean)
    return stream.content.byteLength > stream.position ? 0 : 1;
  }

  async filePos(stream: BbScriptStream): Promise<number> {
    return stream.position;
  }

  async fileSize(path: string): Promise<number> {
    return new Promise((resolve: Function, reject: Function) => {
      this.http
        .get(`${environment.apiServer}/files/file-size`, { params: { path } })
        .toPromise()
        .then((response: ApiResponse<number>) => resolve(response.data));
    });
  }

  async fileType(path: string): Promise<BbScriptFileType> {
    return new Promise((resolve: Function, reject: Function) => {
      this.http
        .get(`${environment.apiServer}/files/file-type`, { params: { path } })
        .toPromise()
        .then((response: ApiResponse<BbScriptFileType>) => resolve(response.data));
    });
  }

  async moreFiles(path: string): Promise<boolean> {
    // TODO: implement
    return false;
  }

  async nextFile(directory: BbScriptDirectory): Promise<string> {
    // TODO: implement
    return null;
  }

  async openFile(path: string): Promise<BbScriptStream> {
    return new Promise((resolve: Function, reject: Function) => {
      this.http
        .get(`${environment.apiServer}/files/get-content`, { params: { path } })
        .toPromise()
        .then((response: ApiResponse<string>) => resolve(new BbScriptStream(response.data, true, true)));
    });
  }

  async readAvail(stream: BbScriptStream): Promise<number> {
    // TODO: there seems to be an issue in BlitzBasic: https://www.blitzforum.de/forum/viewtopic.php?t=35793
    return 0;
  }

  async readByte(stream: BbScriptStream): Promise<number> {
    // TODO: implement
    return 0;
  }

  async readDir(path: string): Promise<BbScriptDirectory> {
    // TODO: implement
    return new BbScriptDirectory();
  }

  async readFile(path: string): Promise<BbScriptStream> {
    return new Promise((resolve: Function, reject: Function) => {
      this.http
        .get(`${environment.apiServer}/files/get-content`, { params: { path } })
        .toPromise()
        .then((response: ApiResponse<string>) => resolve(new BbScriptStream(response.data, true, false)));
    });
  }

  async readFloat(stream: BbScriptStream): Promise<number> {
    // TODO: implement
    return 0;
  }

  async readInt(stream: BbScriptStream): Promise<number> {
    // TODO: implement
    return 0;
  }

  async readLine(stream: BbScriptStream): Promise<string> {
    // TODO: implement
    return '';
  }

  async readShort(stream: BbScriptStream): Promise<number> {
    // TODO: implement
    return 0;
  }

  async readString(stream: BbScriptStream): Promise<string> {
    // TODO: implement
    return '';
  }

  async seekFile(stream: BbScriptStream, position: number): Promise<number> {
    stream.position = position;
    return position;
  }

  async writeByte(stream: BbScriptStream, value: number): Promise<void> {
    // TODO: implement
  }

  async writeFile(path: string): Promise<BbScriptStream> {
    return new Promise((resolve: Function, reject: Function) => {
      const body = new HttpParams().set('path', path);
      this.http
        .post(`${environment.apiServer}/files/create-file`, body)
        .toPromise()
        .then(() => resolve(new BbScriptStream('', false, true)));
    });
  }

  async writeFloat(stream: BbScriptStream, value: number): Promise<void> {
    // TODO: implement
  }

  async writeInt(stream: BbScriptStream, value: number): Promise<void> {
    // TODO: implement
  }

  async writeLine(stream: BbScriptStream, value: string): Promise<void> {
    // TODO: implement
  }

  async writeShort(stream: BbScriptStream, value: number): Promise<void> {
    // TODO: implement
  }

  async writeString(stream: BbScriptStream, value: string): Promise<void> {
    // TODO: implement
  }
}
