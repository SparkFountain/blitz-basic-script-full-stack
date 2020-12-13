import { Injectable } from '@angular/core';
import { Parser, ParseResult } from './parser';
import { AbstractSyntax } from '@blitz-basic-script/game';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor() {}

  createAbstractSyntax(code: string[]): AbstractSyntax {
    let result: AbstractSyntax = {
      globals: {},
      codeBlocks: [],
      mainLoop: [],
      functions: [],
      types: {},
    };

    console.info('[CREATE ABSTRACT SYNTAX]');

    // PREPROCESS CODE
    // remove unnecessary space characters; ignore comments and empty code lines
    const codeFormatted: string[] = [];
    code.forEach((line: string) => {
      line = line.trim();
      if (line.length > 0 && !line.startsWith(';')) {
        codeFormatted.push(line.replace(/\s\s+/g, ' '));
      }
    });

    console.info(codeFormatted);

    // ITERATE OVER ALL LINES
    codeFormatted.forEach((line: string) => {
      // assignment?
      if (line.match(/\w\s?=\s?.+/)) {
        console.info('[ASSIGNMENT FOUND]', line);
      }

      // if block / statement
      else if (line.match(/if\s.+/i)) {
        console.info('[IF BLOCK / STATEMENT FOUND]', line);
      }

      // for to next loop
      else if (line.match(/for\s.+\sto.+(step\s.+)?/i)) {
        console.info('[IF BLOCK / STATEMENT FOUND]', line);
      }

      // label?
      else if (line.match(/\.\w/)) {
        console.info('[LABEL FOUND]', line);
      }

      // command?
      else if (line.match(/\w(.*)/)) {
        console.info('[COMMAND FOUND]', line);
      }

      // invalid code line
      else {
        console.warn('[INVALID CODE LINE FOUND]', line);
      }
    });

    return result;
  }

  parse(code: string[]): ParseResult {
    const codeOneLine = code.join(' '); // TODO: think about an alternative line delimiter
    console.info('[CODE ONE LINE]', JSON.stringify(codeOneLine));
    return new Parser(codeOneLine).parse();
  }
}
