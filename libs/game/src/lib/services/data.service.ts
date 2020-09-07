import { Injectable } from '@angular/core';
import { CommandsDataBankService } from './data/bank.service';
import { CommandsDataFileSystemService } from './data/file-system.service';
import { BbScriptBank } from 'bbscript/src/classes/in-game/data/bank';
import { BbScriptStream } from 'bbscript/src/classes/in-game/data/stream';
import { BbScriptDirectory } from 'bbscript/src/classes/in-game/data/directory';
import { BbScriptFileType } from 'bbscript/src/enums/in-game/file-system/file-type';

@Injectable()
export class CommandsDataService {
  constructor(private bank: CommandsDataBankService, private fileSystem: CommandsDataFileSystemService) {}

  // BANK
  async bankSize(bank: BbScriptBank): Promise<number> {
    return this.bank.bankSize(bank);
  }

  async copyBank(
    sourceBank: BbScriptBank,
    sourcePos: number,
    targetBank: BbScriptBank,
    targetPos: number,
    length?: number
  ): Promise<void> {
    return this.bank.copyBank(sourceBank, sourcePos, targetBank, targetPos, length);
  }

  async createBank(bytes?: number): Promise<BbScriptBank> {
    return this.bank.createBank(bytes);
  }

  async freeBank(bank: BbScriptBank): Promise<void> {
    return this.bank.freeBank(bank);
  }

  async peekByte(bank: BbScriptBank, pos: number): Promise<number> {
    return this.bank.peekByte(bank, pos);
  }

  async peekFloat(bank: BbScriptBank, pos: number): Promise<number> {
    return this.bank.peekFloat(bank, pos);
  }

  async peekInt(bank: BbScriptBank, pos: number): Promise<number> {
    return this.bank.peekInt(bank, pos);
  }

  async peekShort(bank: BbScriptBank, pos: number): Promise<number> {
    return this.bank.peekShort(bank, pos);
  }

  async pokeByte(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    return this.bank.pokeByte(bank, pos, value);
  }

  async pokeFloat(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    return this.bank.pokeFloat(bank, pos, value);
  }

  async pokeInt(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    return this.bank.pokeInt(bank, pos, value);
  }

  async pokeShort(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    return this.bank.pokeShort(bank, pos, value);
  }

  async readBytes(bank: BbScriptBank, stream: BbScriptStream, startPos: number, length: number): Promise<number> {
    return this.bank.readBytes(bank, stream, startPos, length);
  }

  async resizeBank(bank: BbScriptBank, bytes: number): Promise<void> {
    return this.bank.resizeBank(bank, bytes);
  }

  async writeBytes(bank: BbScriptBank, stream: BbScriptStream, startPos: number, length: number): Promise<number> {
    return this.bank.writeBytes(bank, stream, startPos, length);
  }

  // FILE SYSTEM
  async changeDir(path: string): Promise<void> {
    return this.fileSystem.changeDir(path);
  }

  async closeDir(directory: BbScriptDirectory): Promise<void> {
    return this.fileSystem.closeDir(directory);
  }

  async closeFile(stream: BbScriptStream): Promise<void> {
    return this.fileSystem.closeFile(stream);
  }

  async copyFile(sourcePath: string, targetPath: string): Promise<void> {
    return this.fileSystem.copyFile(sourcePath, targetPath);
  }

  async createDir(path: string): Promise<void> {
    return this.fileSystem.createDir(path);
  }

  async currentDir(): Promise<string> {
    return this.fileSystem.currentDir();
  }

  async deleteDir(path: string): Promise<void> {
    return this.fileSystem.deleteDir(path);
  }

  async deleteFile(path: string): Promise<void> {
    return this.fileSystem.deleteFile(path);
  }

  async eof(stream: BbScriptStream): Promise<-1 | 0 | 1> {
    return this.fileSystem.eof(stream);
  }

  async filePos(stream: BbScriptStream): Promise<number> {
    return this.fileSystem.filePos(stream);
  }

  async fileSize(path: string): Promise<number> {
    return this.fileSystem.fileSize(path);
  }

  async fileType(path: string): Promise<BbScriptFileType> {
    return this.fileSystem.fileType(path);
  }

  async moreFiles(path: string): Promise<boolean> {
    return this.fileSystem.moreFiles(path);
  }

  async nextFile(directory: BbScriptDirectory): Promise<string> {
    return this.fileSystem.nextFile(directory);
  }

  async openFile(path: string): Promise<BbScriptStream> {
    return this.fileSystem.openFile(path);
  }

  async readAvail(stream: BbScriptStream): Promise<number> {
    return this.fileSystem.readAvail(stream);
  }

  async readByte(stream: BbScriptStream): Promise<number> {
    return this.fileSystem.readByte(stream);
  }

  async readDir(path: string): Promise<BbScriptDirectory> {
    return this.fileSystem.readDir(path);
  }

  async readFile(path: string): Promise<BbScriptStream> {
    return this.fileSystem.readFile(path);
  }

  async readFloat(stream: BbScriptStream): Promise<number> {
    return this.fileSystem.readFloat(stream);
  }

  async readInt(stream: BbScriptStream): Promise<number> {
    return this.fileSystem.readInt(stream);
  }

  async readLine(stream: BbScriptStream): Promise<string> {
    return this.fileSystem.readLine(stream);
  }

  async readShort(stream: BbScriptStream): Promise<number> {
    return this.fileSystem.readShort(stream);
  }

  async readString(stream: BbScriptStream): Promise<string> {
    return this.fileSystem.readString(stream);
  }

  async seekFile(stream: BbScriptStream, position: number): Promise<number> {
    return this.fileSystem.seekFile(stream, position);
  }

  async writeByte(stream: BbScriptStream, value: number): Promise<void> {
    return this.fileSystem.writeByte(stream, value);
  }

  async writeFile(path: string): Promise<BbScriptStream> {
    return this.fileSystem.writeFile(path);
  }

  async writeFloat(stream: BbScriptStream, value: number): Promise<void> {
    return this.fileSystem.writeFloat(stream, value);
  }

  async writeInt(stream: BbScriptStream, value: number): Promise<void> {
    return this.fileSystem.writeInt(stream, value);
  }

  async writeLine(stream: BbScriptStream, value: string): Promise<void> {
    return this.fileSystem.writeLine(stream, value);
  }

  async writeShort(stream: BbScriptStream, value: number): Promise<void> {
    return this.fileSystem.writeShort(stream, value);
  }

  async writeString(stream: BbScriptStream, value: string): Promise<void> {
    return this.fileSystem.writeString(stream, value);
  }
}
