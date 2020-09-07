import { Injectable } from '@angular/core';
import { BbScriptBank } from 'bbscript/src/classes/in-game/data/bank';

@Injectable()
export class CommandsDataBankService {
  constructor() {}

  async bankSize(bank: BbScriptBank): Promise<number> {
    return 0;
  }

  async copyBank(
    sourceBank: BbScriptBank,
    sourcePos: number,
    targetBank: BbScriptBank,
    targetPos: number,
    length?: number
  ): Promise<void> {
    // TODO: implement
    return null;
  }

  async createBank(bytes?: number): Promise<BbScriptBank> {
    // TODO: implement
    return null;
  }

  async freeBank(bank: BbScriptBank): Promise<void> {
    bank = null;
  }

  async peekByte(bank: BbScriptBank, pos: number): Promise<number> {
    // TODO: implement
    return 0;
  }

  async peekFloat(bank: BbScriptBank, pos: number): Promise<number> {
    // TODO: implement
    return 0;
  }

  async peekInt(bank: BbScriptBank, pos: number): Promise<number> {
    // TODO: implement
    return 0;
  }

  async peekShort(bank: BbScriptBank, pos: number): Promise<number> {
    // TODO: implement
    return 0;
  }

  async pokeByte(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    // TODO: implement
  }

  async pokeFloat(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    // TODO: implement
  }

  async pokeInt(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    // TODO: implement
  }

  async pokeShort(bank: BbScriptBank, pos: number, value: number): Promise<void> {
    // TODO: implement
  }

  async readBytes(bank: BbScriptBank, stream: any, startPos: number, length: number): Promise<number> {
    // TODO: implement
    return 0;
  }

  async resizeBank(bank: BbScriptBank, bytes: number): Promise<void> {
    // TODO: implement
  }

  async writeBytes(bank: BbScriptBank, stream: any, startPos: number, length: number): Promise<number> {
    // TODO: implement
    return 0;
  }
}
