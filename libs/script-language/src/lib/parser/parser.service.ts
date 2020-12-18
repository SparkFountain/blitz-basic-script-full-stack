import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractSyntax } from './interfaces/abstract-syntax';
import { CodeBlock } from './interfaces/code/code-block';
import { ApiCommand, ApiResponse } from '@blitz-basic-script/api-interfaces';
import { CommandStatement } from './classes/command-statement';
import { Assignment } from './classes/assignment';
import { VariableExpression } from './classes/expressions/variable-expression';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  globals: string[];

  constructor(private http: HttpClient) {
    this.globals = [];
  }

  async createAbstractSyntax(code: string[]): Promise<AbstractSyntax> {
    this.globals = [];

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
      const parserResult: CodeBlock | Assignment = await this.parseLine(line);
      console.info('[PARSER RESULT]', parserResult);

      switch (parserResult.constructor.name) {
        case 'CodeBlock':
        case 'CommandStatement':
        case 'Assignment':
          result.codeBlocks.push(parserResult);
          break;
        default:
          console.warn(
            "Parser doesn't know what to do with that:",
            parserResult
          );
      }
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

        // global variable
        if (new RegExp('^global', 'i').test(line)) {
          const params: string[] = line
            .substr(7)
            .split(/\s|=/)
            .filter((e) => e !== '');
          // console.info('[GLOBAL ASSIGNMENT PARAMETERS]', params);

          params[0] = params[0].toLowerCase();
          this.globals.push(params[0]);
          resolve(new Assignment('global', params[0], params[1]));
        }
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
            console.info('[PARAMS]', params);

            // generate code block entry in abstract syntax
            resolve(
              new CommandStatement(command, [
                ...params.map((param) => {
                  param = param.trim();

                  if (this.globals.indexOf(param.toLowerCase()) > -1) {
                    return new VariableExpression(
                      'global',
                      param.toLowerCase()
                    );
                  } else {
                    return param;
                  }
                }),
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
