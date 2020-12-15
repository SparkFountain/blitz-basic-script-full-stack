import { Injectable } from '@angular/core';
import { Parser, ParseResult } from './parser';
import { AbstractSyntax, ApiCommand } from '@blitz-basic-script/game';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from 'libs/game/src/lib/interfaces/api/api-response';
import { CommandStatement } from 'libs/game/src/lib/classes/command-statement';
import { NumericExpression } from 'libs/game/src/lib/classes/expressions/numerical-expression';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor(private http: HttpClient) {}

  // TODO: implement correct async workflow
  createAbstractSyntax(code: string[]): Promise<AbstractSyntax> {
    return new Promise((resolve, reject) => {
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

      // console.info(codeFormatted);

      // ITERATE OVER ALL LINES
      codeFormatted.forEach((line: string) => {
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
        }

        // if block / statement
        else if (line.match(regex.ifBlock)) {
          console.info('[IF BLOCK / STATEMENT FOUND]', line);
        }

        // for to next loop
        else if (line.match(regex.forToNext)) {
          console.info('[IF BLOCK / STATEMENT FOUND]', line);
        }

        // label?
        else if (line.match(regex.label)) {
          console.info('[LABEL FOUND]', line);
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
              console.info('[API COMMAND]', response);

              // parse parameters
              const params: string[] = line.split(',');
              console.info('[PARAMS]', params);

              // generate code block entry in abstract syntax
              result.codeBlocks.push(
                new CommandStatement(command, [
                  ...params.map(
                    (param: string) => new NumericExpression(Number(param))
                  ),
                ])
              );
            });
        }

        // invalid code line
        else {
          console.warn('[INVALID CODE LINE FOUND]', line);
        }
      });

      return result;
    });
  }

  parse(code: string[]): ParseResult {
    const codeOneLine = code.join(' '); // TODO: think about an alternative line delimiter
    console.info('[CODE ONE LINE]', JSON.stringify(codeOneLine));
    return new Parser(codeOneLine).parse();
  }
}
