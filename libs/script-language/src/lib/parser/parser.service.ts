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
import { ForToNext } from './classes/loops/for-to-next';
import { RepeatUntil } from './classes/loops/repeat-until';
import { WhileWend } from './classes/loops/while-wend';
import { Field } from './classes/field';
import { ParserError } from './classes/error';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  globals: string[];

  isMainLoop!: boolean;
  currentFunction!: string;
  currentType!: string;
  isSelect!: boolean;

  constructor(private http: HttpClient) {
    this.globals = [];

    this.isMainLoop = false;
    this.currentFunction = '';
    this.currentType = '';
    this.isSelect = false;
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

  // TODO: add more return types
  async parseLine(line: string): Promise<CodeBlock | Assignment | Function> {
    const regex = {
      dim: new RegExp('^dim\s(\w+)$','i'),
      global: new RegExp('^global\s(\w+)$','i'),
      local: new RegExp('^local\s(\w+)$','i'),
      const: new RegExp('^const\s(\w+)$','i'),
      assignment: new RegExp('^\w+\s?=\s?.+$','i'),
      command: new RegExp('^(\w+)$','i'),
      function: new RegExp('^function\s(\w+)\((.*)\)$','i'),
      return: new RegExp('^return\s?(\w+)','i'),
      type: new RegExp('^type\s(\w+)$','i'),
      field: new RegExp('^field\s(\w+)$','i'),
      if: new RegExp('^if\s(.+)$','i'),
      elseif: new RegExp('^elseif\s$','i'),
      else: new RegExp('^else$','i'),
      endif: new RegExp('^endif$','i'),
      select: new RegExp('^select\s(\w+)$','i'),
      case: new RegExp('^case\s(\w+)$','i'),
      default: new RegExp('^default$','i'),
      forTo: new RegExp('^for\s(\w+)\s*=\s*(\w+)\sto\s(\w+)(\sstep\s(\w+))?$','i'),
      forEach: new RegExp('^for\s(\w+)\s*=\s*each\s(\w+)$','i'),
      next: new RegExp('^next$','i'),
      while: new RegExp('^while(\w+)$','i'),
      wend: new RegExp('^wend$','i'),
      repeat: new RegExp('^repeat$','i'),
      until: new RegExp('^until(\w+)$','i'),
      forever: new RegExp('^forever$','i'),
      mainLoop: new RegExp('^mainloop$','i'),
      label: new RegExp('^\.\w+$','i'),
      delete: new RegExp('^delete\s(\w+)$','i'),
      insert: new RegExp('^insert\s(\w+)$','i'),
      end: new RegExp('^end$','i'),
      include: new RegExp('^include$','i'),
      stop: new RegExp('^stop$','i'),
      data: new RegExp('^data$','i'),
      exit: new RegExp('^exit$','i'),
      restore: new RegExp('^restore\s(\w+)$','i'),
      read: new RegExp('^read\s(\w+)','i'),
    };
    let match: RegExpMatchArray;

    // dim (array)
    match = line.match(regex.dim);
    if (match) {
      const arrayName: string = match[1];
      return new Assignment('dim', arrayName, null);
    }

    // global
    match = line.match(regex.global);
    if (match) {
      // TODO: initial assignment value; support multiple assignments in one line
      const globalName: string = match[1];
      return new Assignment('global', globalName, null);
    }

    // local
    match = line.match(regex.local);
    if (match) {
      // TODO: initial assignment value; support multiple assignments in one line
      const localName: string = match[1];
      return new Assignment('local', localName, null);
    }

    // const
    match = line.match(regex.const);
    if (match) {
      // TODO: initial assignment value; support multiple assignments in one line
      const constName: string = match[1];
      return new Assignment('const', constName, null);
    }

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
          defaultValue:
            paramSplit.length > 1 ? paramSplit[1].trim() : undefined,
        };
        formattedParams.push(param);
      });

      this.currentFunction = functionName;
      return new Function(functionName, formattedParams, []);
    }

    // return
    match = line.match(regex.return);
    if (match) {
      let returnValue: string;
      if (match[1]) {
        returnValue = match[1];
      } else {
        returnValue = null;
      }

      return null; // TODO: introduce return statement
    }

    // type
    match = line.match(regex.type);
    if (match) {
      const typeName: string = match[1];

      this.currentType = typeName;
      return new Type(typeName, []);
    }

    // field
    match = line.match(regex.field);
    if (match) {
      if (this.currentType === '') {
        return new ParserError('Field declaration without Type', -1, -1); // TODO: line and offset
      }

      const fieldName: string = match[1];
      return new Field(fieldName);
    }

    // if block / statement
    match = line.match(regex.if);
    if (match) {
      console.info('[IF BLOCK / STATEMENT FOUND]', line);
      return null;
    }

    // else if
    match = line.match(regex.elseif);
    if (match) {
      console.info('[ELSEIF FOUND]', line);
      return null;
    }

    // else
    match = line.match(regex.else);
    if (match) {
      console.info('[ELSE FOUND]', line);
      return null;
    }

    // endif
    match = line.match(regex.endif);
    if (match) {
      console.info('[ENDIF FOUND]', line);
      return null;
    }

    // select
    match = line.match(regex.select);
    if (match) {
      console.info('[SELECT FOUND]', line);

      this.isSelect = true;
      return null;
    }

    // case
    match = line.match(regex.case);
    if (match) {
      if (!this.isSelect) {
        return new ParserError('Case without Select', -1, -1); // TODO: line and offset
      }

      console.info('[CASE FOUND]', line);
      return null;
    }

    // default
    match = line.match(regex.default);
    if (match) {
      if (!this.isSelect) {
        return new ParserError('Default without Select', -1, -1); // TODO: line and offset
      }

      console.info('[DEFAULT FOUND]', line);
      return null;
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

    // for to next loop
    match = line.match(regex.forTo);
    if (match) {
      console.info('[FOR TO LOOP FOUND]', match);

      const loopVariable: string = match[1];
      const initialValue: number = Number(match[2]);
      const limitValue: number = Number(match[3]);
      let stepValue: number;
      if (match.hasOwnProperty('5')) {
        stepValue = Number(match[5]);
      } else {
        stepValue = 1;
      }

      return new ForToNext(
        new Assignment('local', loopVariable, initialValue),
        limitValue,
        stepValue,
        []
      );
    }

    // for each loop
    match = line.match(regex.forEach);
    if (match) {
      console.info('[FOR TO LOOP FOUND]', match);

      const loopVariable: string = match[1];
      const loopVarType: string = match[2];

      return new Noop(); // TODO: implement
    }

    // next
    match = line.match(regex.next);
    if (match) {
      // TODO: implement stack for loops

      console.info('[NEXT FOUND]', match);
      return new Noop();  // TODO: implement
    }

    // while wend loop
    match = line.match(regex.while);
    if (match) {
      console.info('[WHILE LOOP FOUND]', match);
      return new WhileWend(null, []);
    }

    // repeat loop
    match = line.match(regex.repeat);
    if (match) {
      console.info('[REPEAT LOOP FOUND]', match);
      return new RepeatUntil(null, []);
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

    // invalid code line
    return `Invalid code line: ${line}`;
  }
}
