import { Injectable } from '@angular/core';
import { Parser, ParseResult } from './parser';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor() {}

  parse(code: string[]): ParseResult {
    return new Parser(code.join()).parse();
  }
}
