import { Injectable } from '@angular/core';
import { Parser, ParseResult } from './parser';
import { AbstractSyntax, ApiCommand } from '@blitz-basic-script/game';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'libs/game/src/lib/interfaces/api/api-response';
import { CommandStatement } from 'libs/game/src/lib/classes/command-statement';
import { Value } from 'libs/game/src/lib/classes/expressions/expression';
import { CodeBlock } from 'libs/game/src/lib/interfaces/code/block';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor(private http: HttpClient) {}

  // TODO: implement correct async workflow
  async createAbstractSyntax(code: string[]): Promise<AbstractSyntax> {
    console.info('[CREATE ABSTRACT SYNTAX]');

    let result: AbstractSyntax = {
      globals: {},
      codeBlocks: [],
      mainLoop: [],
      functions: [],
      types: {},
    };

    // PREPROCESS CODE:
    // remove unnecessary space characters; ignore comments and empty code lines
    let codeFormatted: string[] = [];
    code.forEach((line: string) => {
      line = line.trim();
      if (line.length > 0 && !line.startsWith(';')) {
        codeFormatted.push(line.replace(/\s\s+/g, ' '));
      }
    });

    // PARSE ALL LINES SEQUENTIALLY
    for (const line of codeFormatted) {
      const codeBlock: CodeBlock = await this.parseLine(line);
      console.info('[PARSER RESULT]', codeBlock);

      result.codeBlocks.push(codeBlock);
    }

    return result;
  }

  // TODO: return type (can also be something else probably)
  async parseLine(line: string): Promise<CodeBlock> {
    return new Promise((resolve, reject) => {
      const regex = {
        assignment: /\w\s?=\s?.+/,
        ifBlock: /if\s.+/i,
        forToNext: /for\s.+\sto.+(step\s.+)?/i,
        label: /\.\w/,
        command: /\b(\w+)\b/,
      };

      // assignment?
      if (line.match(regex.assignment)) {
        console.info('[ASSIGNMENT FOUND]', line);
        resolve(null);
      }

      // if block / statement
      else if (line.match(regex.ifBlock)) {
        console.info('[IF BLOCK / STATEMENT FOUND]', line);
        resolve(null);
      }

      // for to next loop
      else if (line.match(regex.forToNext)) {
        console.info('[IF BLOCK / STATEMENT FOUND]', line);
        resolve(null);
      }

      // label?
      else if (line.match(regex.label)) {
        console.info('[LABEL FOUND]', line);
        resolve(null);
      }

      // command?
      else if (line.match(regex.command)) {
        const match = line.match(regex.command);
        // console.info('[LINE MATCH]', match);

        const command: string = match[0].toLowerCase();
        // console.info('[COMMAND FOUND]', command);

        line = line.replace(new RegExp(command, 'i'), '');
        // console.info('[REMAINING LINE]', line);

        // get the command
        // TODO: how to get the correct url here?
        this.http
          .get(`http://localhost:3333/api/language/command?name=${command}`)
          .toPromise()
          .then((response: ApiResponse<ApiCommand>) => {
            // console.info('[API COMMAND]', response);

            // parse parameters
            const params: string[] = line.split(',');
            // console.info('[PARAMS]', params);

            // generate code block entry in abstract syntax
            resolve(
              new CommandStatement(command, [
                ...params.map((param) => param.trim()),
              ])
            );
          });
      }

      // invalid code line
      else {
        reject(`Invalid code line: ${line}`);
      }
    });
  }
}
