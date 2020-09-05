import { Injectable } from '@angular/core';
import { LexerToken } from './interfaces/lexer-token';
import { LexerTokenCategory } from './enums/lexer-token-category';
import { LexerContext } from './enums/lexer-context';
import { LanguageService } from '../language/language.service';

@Injectable({
  providedIn: 'root',
})
export class LexerService {
  private individuals: any;

  constructor(private language: LanguageService) {
    this.individuals = {
      functions: [],
      types: [],
      globals: [],
      dims: [],
    };
  }

  /**
   * Checks if a given character sequence matches an integer value.
   * @param chars A character sequence from the lexer
   * @return True if the character sequence matches an integer, otherwise false
   */
  isInteger(chars: string): boolean {
    if (chars.trim() === '') {
      return false;
    }
    return new RegExp('^[+\\-]?\\d+$').test(chars);
  }

  /**
   * Checks if a given character sequence matches a float value.
   * @param chars A character sequence from the lexer
   * @return True if the character sequence matches a float, otherwise false
   */
  isFloat(chars: string): boolean {
    if (chars.trim() === '' || chars === '-' || chars === '+') {
      return false;
    }
    return new RegExp('^-?\\d*(\\.\\d+)?$').test(chars);
  }

  /**
   * Detects which token should be generated for a given character sequence,
   * and returns the corresponding token object.
   * @param chars A character sequence from the lexer
   * @param i
   * @return
   */
  getTokenObject(chars: string, i: number): LexerToken {
    // console.info('Get token object:', chars);

    let charsLowerCase = chars.toLowerCase();
    if (this.language.keywords.hasOwnProperty(charsLowerCase)) {
      switch (charsLowerCase) {
        case 'true':
        case 'false':
          return {
            which: LexerTokenCategory.BOOLEAN,
            value: chars === 'true' ? true : false,
            offset: { x: i + 1, y: 0 },
          };
        case 'pi':
          return {
            which: LexerTokenCategory.FLOAT,
            value: Math.PI,
            offset: { x: i + 1, y: 0 },
          };
        default:
          return {
            which: LexerTokenCategory.KEYWORD,
            value: chars,
            offset: { x: i + 1, y: 0 },
          };
      }
    } else if (this.language.commands.hasOwnProperty(charsLowerCase)) {
      return {
        which: LexerTokenCategory.COMMAND,
        value: chars,
        offset: { x: i + 1, y: 0 },
      };
    } else if (this.isInteger(chars)) {
      return {
        which: LexerTokenCategory.INTEGER,
        value: Number(chars),
        offset: { x: i + 1, y: 0 },
      };
    } else if (this.isFloat(chars)) {
      return {
        which: LexerTokenCategory.FLOAT,
        value: Number(chars),
        offset: { x: i + 1, y: 0 },
      };
    } else if (this.individuals.functions.indexOf(chars) > -1) {
      return {
        which: LexerTokenCategory.FUNCTION,
        value: chars,
        offset: { x: i + 1, y: 0 },
      };
    } else if (this.individuals.types.indexOf(chars) > -1) {
      return {
        which: LexerTokenCategory.TYPE,
        value: chars,
        offset: { x: i + 1, y: 0 },
      };
    } else if (this.individuals.types.indexOf(chars) > -1) {
      return {
        which: LexerTokenCategory.TYPE,
        value: chars,
        offset: { x: i + 1, y: 0 },
      };
    } else if (this.individuals.globals.indexOf(chars) > -1) {
      return {
        which: LexerTokenCategory.VARIABLE,
        value: chars,
        offset: { x: i + 1, y: 0 },
      };
    } else {
      if (chars.length > 0) {
        //individuals can be user functions or variable names
        return {
          which: LexerTokenCategory.VARIABLE,
          value: chars,
          offset: { x: i + 1, y: 0 },
        };
      } else {
        return {
          which: LexerTokenCategory.EMPTY,
          value: '',
          offset: { x: i + 1, y: 0 },
        };
      }
    }
  }

  /**
   * Removes all empty tokens from a token array.
   * @param tokens A token array from the lexer
   * @return An array of all remaining non-empty tokens in correct order
   */
  removeEmptyTokens(tokens: LexerToken[]): LexerToken[] {
    let result: LexerToken[] = [];
    for (let i = 0; i < tokens.length; i++) {
      if (!(tokens[i].which === LexerTokenCategory.EMPTY)) {
        result.push(tokens[i]);
      }
    }
    return result;
  }

  /**
   * Performs lexing operations on each code line successively.
   * @param code An array of BBScript code lines
   * @return An array of arrays, containing all tokens per code line
   */
  lexCode(code: string[]): Array<LexerToken[]> {
    //console.info('Key Words:', this.language.keywords);
    let lexer: LexerService = this;

    let result: Array<LexerToken[]> = [];
    code.forEach((line: string, index: number) => {
      line = line.replace(/\r|\n/, '');
      let tokens: LexerToken[] = lexer.lexLine(line);
      for (let i = 0; i < tokens.length; i++) {
        tokens[i].offset.y = index + 1;
      }
      result.push(tokens);
    });
    return result;
  }

  // lexCodeReactive(code: Array<string[]>): Array<LexerToken[]> {
  //   let constants: string[] = [];
  //   let globals: string[] = [];
  //   let functions: string[] = [];

  //   let result: Array<LexerToken[]> = [];

  //   code.forEach((line: string[]) => {
  //     fromArray(line).subscribe((char: string) => {
  //       console.info(char);
  //     });
  //   });

  //   return result;
  // }

  /**
   * Performs lexing operations on a BBScript code line.
   * @param codeLine A string consisting of plain BBScript code
   * @return An array of tokens which represent the code's components
   */
  lexLine(codeLine: string): LexerToken[] {
    //replace tabs by 2 spaces
    codeLine = codeLine.replace(new RegExp('\\t', 'g'), '  ');

    let context: LexerContext = LexerContext.DEFAULT;
    let chars: string = '';
    let charsLowerCase: string = '';
    let tokens: LexerToken[] = [];
    let lookAhead: string;

    //find first non-space occurrence
    let startIndex: number = -1;
    for (let i = 0; i < codeLine.length; i++) {
      if (codeLine[i] !== ' ') {
        startIndex = i;
        break;
      }
    }
    if (startIndex === -1) {
      return [];
    }

    //find last non-space occurrence
    let endIndex: number = -1;
    for (let i = codeLine.length - 1; i >= 0; i--) {
      if (codeLine[i] !== ' ') {
        endIndex = i;
        break;
      }
    }

    for (let i = startIndex; i <= endIndex; i++) {
      charsLowerCase = chars.toLowerCase();
      //console.info('chars:', chars);

      switch (context) {
        case LexerContext.DEFAULT:
          switch (codeLine[i]) {
            case ' ':
              if (chars !== '+' && chars !== '-') {
                tokens.push(this.getTokenObject(chars, i - chars.length));
                chars = '';
              }
              break;
            case ',':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.COMMA,
                value: ',',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              break;
            case '"':
              if (chars.length > 0) {
                //this is an erroneous case, thus the parser should throw an error
                tokens.push({
                  which: LexerTokenCategory.INDIVIDUAL,
                  value: chars,
                  offset: { x: i + 1 - chars.length, y: 0 },
                });
                chars = '';
              }
              tokens.push({
                which: LexerTokenCategory.DOUBLE_QUOTE,
                value: '"',
                offset: { x: i + 1, y: 0 },
              });
              context = LexerContext.STRING;
              break;
            case ';':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.COMMENT_MARKER,
                value: ';',
                offset: { x: i + 1, y: 0 },
              });
              tokens.push({
                which: LexerTokenCategory.COMMENT,
                value: codeLine.substr(i + 1),
                offset: { x: i + 1, y: 0 },
              });
              return this.removeEmptyTokens(tokens);
            case '=':
              lookAhead = codeLine[i + 1];
              if (lookAhead === '=') {
                //comparison
                tokens.push(this.getTokenObject(chars, i - chars.length));
                tokens.push({
                  which: LexerTokenCategory.COMPARISON,
                  value: '==',
                  offset: { x: i + 1, y: 0 },
                });
                i += 1; //skip matching next char, which is the second "="
              } else {
                //assignment
                tokens.push(this.getTokenObject(chars, i - chars.length));
                tokens.push({
                  which: LexerTokenCategory.ASSIGNMENT,
                  value: '=',
                  offset: { x: i + 1, y: 0 },
                });
              }
              chars = '';
              break;
            case '(':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.BRACKET_OPEN,
                value: '(',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              break;
            case ')':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.BRACKET_CLOSE,
                value: ')',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              break;
            case '.':
              if (i === endIndex) {
                // invalid (another char must follow)
                tokens.push({
                  which: LexerTokenCategory.INVALID,
                  value: chars,
                  offset: { x: codeLine.length - chars.length, y: 0 },
                });
              } else if (this.isInteger(codeLine[i + 1])) {
                // float number
                chars += codeLine[i];
              } else if (tokens.length === 0) {
                // label
                tokens.push({
                  which: LexerTokenCategory.LABEL_DOT,
                  value: '.',
                  offset: { x: 0, y: 0 },
                });
                tokens.push({
                  which: LexerTokenCategory.LABEL,
                  value: codeLine.substr(1),
                  offset: { x: 1, y: 0 },
                });
                return this.removeEmptyTokens(tokens);
              } else {
                // type field access
                tokens.push(this.getTokenObject(chars, i - chars.length));
                tokens.push({
                  which: LexerTokenCategory.TYPE_FIELD_DOT,
                  value: '.',
                  offset: { x: i + 1, y: 0 },
                });
                chars = '';
              }
              break;
            case '\\':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.BACKSLASH,
                value: '\\',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '^':
              let isAlgebraic = true;
              if (codeLine[i] === '+' || codeLine[i] === '-') {
                let preNumberTokens = [
                  'bracketOpen',
                  LexerTokenCategory.COMMA,
                  'assignment',
                ];

                //find first non-empty pre token
                for (
                  let preTokenIndex = tokens.length - 1;
                  preTokenIndex > 0;
                  preTokenIndex--
                ) {
                  if (
                    tokens[preTokenIndex].which !== LexerTokenCategory.EMPTY
                  ) {
                    if (
                      preNumberTokens.indexOf(tokens[preTokenIndex].which) > -1
                    ) {
                      //plus or minus is not algebraic but belongs to a following number
                      chars += codeLine[i];
                      isAlgebraic = false;
                    }
                    break;
                  }
                }
              }

              if (isAlgebraic) {
                tokens.push(this.getTokenObject(chars, i - chars.length));
                tokens.push({
                  which: LexerTokenCategory.ALGEBRAIC,
                  value: codeLine[i],
                  offset: { x: i + 1, y: 0 },
                });
                chars = '';
              }
              break;
            case '<':
            case '>':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              lookAhead = codeLine[i + 1];
              if (
                lookAhead === '=' ||
                (codeLine[i] === '<' && lookAhead === '>')
              ) {
                tokens.push({
                  which: LexerTokenCategory.COMPARISON,
                  value: codeLine[i] + lookAhead,
                  offset: { x: i + 1, y: 0 },
                });
                i += 1;
              } else {
                tokens.push({
                  which: LexerTokenCategory.COMPARISON,
                  value: codeLine[i],
                  offset: { x: i + 1, y: 0 },
                });
              }
              chars = '';
              break;
            case '~':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.BITWISE_INVERT,
                value: '~',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              break;
            case ':':
              tokens.push(this.getTokenObject(chars, i - chars.length));
              tokens.push({
                which: LexerTokenCategory.COLON,
                value: ':',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              break;
            default:
              chars += codeLine[i];
              if (i === endIndex) {
                tokens.push(this.getTokenObject(chars, i + 1 - chars.length));
                chars = '';
              }
          }
          break;
        case LexerContext.STRING:
          switch (codeLine[i]) {
            case '"':
              tokens.push({
                which: LexerTokenCategory.STRING,
                value: chars,
                offset: { x: i + 1 - chars.length, y: 0 },
              });
              tokens.push({
                which: LexerTokenCategory.DOUBLE_QUOTE,
                value: '"',
                offset: { x: i + 1, y: 0 },
              });
              chars = '';
              context = LexerContext.DEFAULT;
              break;
            default:
              chars += codeLine[i];
          }
          break;
      }
    }

    //add unidentified last chars if they exist
    if (chars.length > 0) {
      //get amount of whitespace at the end
      let whitespaceAmount = 0;
      for (let i = codeLine.length - 1; i > 0; i--) {
        if (codeLine[i] === ' ') {
          whitespaceAmount++;
        } else {
          break;
        }
      }
      tokens.push({
        which: LexerTokenCategory.UNIDENTIFIED,
        value: chars,
        offset: { x: codeLine.length - chars.length - whitespaceAmount, y: 0 },
      });
    }

    return this.removeEmptyTokens(tokens);
  }

  // TODO: implement or remove
  lexLineNew(codeLine: string): LexerToken[] {
    const specialChars: string[] = [
      '.',
      ',',
      ':',
      ';',
      '%',
      '$',
      '#',
      '"',
      '+',
      '-',
      '*',
      '/',
      '\\',
      '^',
      '=',
      '<',
      '>',
      '~',
      ' ',
    ];

    // Step 1: Replace strings by placeholders

    // Step 2: Find all specials characters that mark a new token

    // Step 3: Split tokens

    // Step 4: Analyze which kinds of tokens

    return [];
  }
}
