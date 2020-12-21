import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractSyntax } from './interfaces/abstract-syntax';
import { CodeBlock } from './interfaces/code/code-block';
import { ApiCommand, ApiResponse } from '@blitz-basic-script/api-interfaces';
import { CommandStatement } from './classes/command-statement';
import { Assignment } from './classes/assignment';
import { VariableExpression } from './classes/expressions/variable-expression';
import { Noop } from './classes/noop';
import { Function, Parameter } from './classes/function';
import { Type } from './classes/type';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  globals: string[];

  isMainLoop!: boolean;
  currentFunction!: string;

  constructor(private http: HttpClient) {
    this.globals = [];

    this.isMainLoop = false;
    this.currentFunction = '';
  }

  async createAbstractSyntax(code: string[]): Promise<AbstractSyntax> {
    this.globals = [];

    console.info('[CREATE ABSTRACT SYNTAX]');

    let result: AbstractSyntax = {
      codeBlocks: [],
      mainLoop: [],
      functions: [],
      types: [],
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
      const parserResult:
        | CodeBlock
        | Assignment
        | Function = await this.parseLine(line);
      console.info('[PARSER RESULT]', parserResult);

      switch (parserResult.constructor.name) {
        case 'CodeBlock':
        case 'CommandStatement':
        case 'Assignment':
          if (this.isMainLoop) {
            result.mainLoop.push(parserResult);
          } else {
            result.codeBlocks.push(parserResult);
          }
          break;
        case 'Function':
          result.functions.push(parserResult as Function);
        case 'Noop':
          // do nothing and neither show a warning
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
  async parseLine(line: string): Promise<CodeBlock | Assignment | Function> {
    const regex = {
      assignment: /\w\s?=\s?.+/,
      ifBlock: /if\s.+/i,
      forToNext: /for\s.+\sto.+(step\s.+)?/i,
      label: /\.\w/,
      command: /\b(\w+)\b/,
      function: /function\s+(\w+)\((.*)\)/i,
      type: /type\s+(\w+)/i,
    };
    let match: RegExpMatchArray;

    // function
    match = line.match(regex.function);
    if (match) {
      let functionName: string = match[1];
      let fullParams = match[2].split(',');
      let formattedParams: Parameter[] = [];
      fullParams.forEach((fullParam: string) => {
        let paramSplit = fullParam.split('=');

        let param: Parameter = {
          name: paramSplit[0].trim(),
          defaultValue: paramSplit.length > 1 ? paramSplit[1].trim() : undefined,
        };
        formattedParams.push(param);
      });

      this.currentFunction = functionName;
      return new Function(functionName, formattedParams, []);
    }

    // type
    match = line.match(regex.type);
    if (match) {
    }

    // main loop
    if (line.toLowerCase() === 'mainloop') {
      this.isMainLoop = true;
      return new Noop();
    }

    // end of main loop
    const allTerms: string[] = line.split(/\s+/);
    if (
      allTerms[0].toLowerCase() === 'end' &&
      allTerms[1].toLowerCase() === 'mainloop'
    ) {
      this.isMainLoop = false;
      return new Noop();
    }

    // assignment
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
        return new Assignment('global', params[0], params[1]);
      }
    }

    // if block / statement
    if (line.match(regex.ifBlock)) {
      console.info('[IF BLOCK / STATEMENT FOUND]', line);
      return null;
    }

    // for to next loop
    if (line.match(regex.forToNext)) {
      console.info('[IF BLOCK / STATEMENT FOUND]', line);
      return null;
    }

    // label
    if (line.match(regex.label)) {
      console.info('[LABEL FOUND]', line);
      return null;
    }

    // command
    if (line.match(regex.command)) {
      const match = line.match(regex.command);
      // console.info('[LINE MATCH]', match);

      const command: string = match[0].toLowerCase();
      // console.info('[COMMAND FOUND]', command);

      line = line.replace(new RegExp(command, 'i'), '');
      // console.info('[REMAINING LINE]', line);

      // get the command
      // TODO: how to get the correct url here?
      const response: ApiResponse<ApiCommand> = await this.http
        .get<ApiResponse<ApiCommand>>(
          `http://localhost:3333/api/language/command?name=${command}`
        )
        .toPromise();

      // console.info('[API COMMAND]', response);

      // parse parameters
      const params: string[] = line.split(',');
      console.info('[PARAMS]', params);

      // generate code block entry in abstract syntax
      return new CommandStatement(command, [
        ...params.map((param) => {
          param = param.trim();

          if (this.globals.indexOf(param.toLowerCase()) > -1) {
            return new VariableExpression('global', param.toLowerCase());
          } else {
            return param;
          }
        }),
      ]);
    }

    // invalid code line
    return `Invalid code line: ${line}`;
  }
}
