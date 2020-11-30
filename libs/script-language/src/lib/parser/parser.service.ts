import { Injectable } from '@angular/core';
import { Parser, ParseResult } from './parser';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor() {}

  parse(code: string[]): ParseResult {
    const codeOneLine = code.join(' '); // TODO: think about an alternative line delimiter
    console.info('[CODE ONE LINE]', JSON.stringify(codeOneLine));
    return new Parser(codeOneLine).parse();
  }
}
