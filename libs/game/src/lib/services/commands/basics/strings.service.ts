import { Injectable } from '@angular/core';

@Injectable()
export class CommandsBasicsStringsService {
  constructor() {}

  async asc(string: string): Promise<number> {
    return string.charCodeAt(0)
  }

  async chr(value: number): Promise<string> {
    return String.fromCharCode(value)
  }

  async instr(text: string, search: string, start: number): Promise<number> {
    //remember, BlitzBasic indexes start at 1, not 0
    if (!start) {
      start = 1;
    }
    let posIndex0 = text.indexOf(search, start - 1);
    return posIndex0 + 1
  }

  async left(text: string, count: number): Promise<string> {
    return text.substr(0, count)
  }

  async len(text: string): Promise<number> {
    return text.length
  }

  async lower(text: string): Promise<string> {
    return text.toLowerCase()
  }

  async lset(text: string, count: number): Promise<string> {
    let len = text.length;
    if (len > count) {
      //strip text to the given count
      return text.substr(0, count)
    } else {
      //fill string with space characters until it has the count length
      return text + Array(count - len).join(' ')
    }
  }

  async mid(text: string, start: number, count: number): Promise<string> {
    if (count) {
      return text.substr(start, count)
    } else {
      return text.substr(start)
    }
  }

  async replace(text: string, search: string, replace: string): Promise<string> {
    return text.replace(new RegExp(search, 'g'), replace)
  }

  async right(text: string, count: number): Promise<string> {
    return text.substr(-count)
  }

  async rset(text: string, count: number): Promise<string> {
    let len = text.length;
    if (len > count) {
      //strip text to the given count
      return text.substr(-count)
    } else {
      //fill string with space characters until it has the count length
      return Array(count - len).join(' ') + text
    }
  }

  async str(value: number): Promise<string> {
    return value.toString()
  }

  async string(text: string, count: number): Promise<string> {
    return Array(count).join(text)
  }

  async trim(text: string): Promise<string> {
    return text.trim()
  }

  async upper(text: string): Promise<string> {
    return text.toUpperCase()
  }
}
