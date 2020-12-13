import { LexerToken } from '../interfaces/lexer-token';
import { LexerTokenCategory } from '../enums/lexer/lexer-token-category';
import { Injectable } from '@angular/core';
import { AbstractSyntax } from '../interfaces/abstract-syntax';
import { GeneralService } from './general.service';
import { GameStateService } from './game-state.service';
import { ParserState } from '../enums/parser/parser-state';
import { LanguageService } from './language.service';
import { ConstStatement } from '../interfaces/statements/const';
import { ParserStatementType } from '../enums/parser/parser-statement-type';
import { CommandsBasicsService } from './commands/basics.service';
import { CommandsDataService } from './commands/data.service';
import { CommandsGraphics2DService } from './commands/graphics2d.service';
import { CommandsGraphics3DService } from './commands/graphics3d.service';
import { ApiCommand } from '../interfaces/api/api-command';
import { CommandsIOService } from './commands/io.service';
import { CommandsSoundService } from './commands/sound.service';
import { CommandsGUIService } from './commands/gui.service';

type CommandResponse = { category: string; command: string; params: any[] };

type ConstContext = 'name' | 'assignmentOrComma' | 'value' | 'comma';
type GlobalContext = 'variable' | 'commaOrAssignment' | 'expression';

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  static MESSAGE = {
    ERROR: {
      DEPRECATED_KEYWORD: {
        EN: 'Deprecated key word',
        DE: 'Veraltetes Schlüsselwort',
      },
      DEPRECATED_COMMAND: {
        EN: 'Deprecated command',
        DE: 'Veralteter Befehl',
      },
      INVALID_TOKEN: {
        EN: 'Invalid token',
        DE: 'Ungültiges Token',
      },
      INVALID_START_TOKEN: {
        EN: 'Invalid start token',
        DE: 'Ungültiges Anfangstoken',
      },
      ILLEGAL_CONTEXT: {
        EN: 'Illegal token context',
        DE: 'Ungültiger Kontext für dieses Token',
      },
      VAR_NAME_EXPECTED: {
        EN: 'Expecting a variable name',
        DE: 'Variablenname erwartet',
      },
      TOO_MANY_PARAMETERS: {
        EN: 'Too many parameters',
        DE: 'Zu viele Parameter angegeben',
      },
      NOT_ENOUGH_PARAMETERS: {
        EN: 'Not enough parameters',
        DE: 'Zu wenige Parameter angegeben',
      },
      COMMA_MUST_BE_FOLLOWED_BY_EXPRESSION: {
        EN: 'Comma must be followed by another expression',
        DE: 'Nach dem Komma muss eine weitere Anweisung folgen',
      },
      MISSING_OPENING_BRACKET: {
        EN: 'Missing opening bracket',
        DE: 'Öffnende Klammer fehlt',
      },
      NO_MORE_TOKENS_ALLOWED: {
        EN: 'No more tokens allowed after last key word',
        DE: 'Keine weiteren Tokens nach dem letzten Schlüsselwort erlaubt',
      },
      NO_CONDITION_BLOCK_OPENED: {
        EN: 'No condition block opened',
        DE: 'Kein Bedingungsblock definiert',
      },
      DUPLICATE_DECLARATION: {
        EN: 'Duplicate Declaration (prohibited)',
        DE: 'Mehrfache Deklaration (verboten)',
      },
      TODO: {
        EN: 'This error message is not implemented yet.',
        DE: 'Diese Fehlermeldung wurde noch nicht implementiert.',
      },
    },
    INFO: {},
    WARNING: {},
  };

  individuals: object;
  stack: any[];
  state;
  abstractSyntax: AbstractSyntax;

  constructor(
    private generalService: GeneralService,
    private gameState: GameStateService,
    private language: LanguageService,
    private basics: CommandsBasicsService,
    private data: CommandsDataService,
    private graphics2d: CommandsGraphics2DService,
    private graphics3d: CommandsGraphics3DService,
    private gui: CommandsGUIService,
    private io: CommandsIOService,
    private sound: CommandsSoundService
  ) {
    this.resetParser();
    this.abstractSyntax = {
      globals: [],
      codeBlocks: [],
      mainLoop: [],
      functions: [],
      types: [],
    };
  }

  /**
   * Resets (or initializes) the parser object, as well as helper variables.
   */
  resetParser(): void {
    //stores individual values
    this.individuals = {};
    //stores code sections (e. g. conditions, selections, loops)
    this.stack = [];
    this.state = '?';
  }

  /**
   * Retrieves all global variables, constants, dim-arrays, function and type names
   * from a given lexer code.
   * @param lexerCode An array of lexer token arrays, preprocessed by the lexer
   */
  getIndividuals(lexerCode: Array<LexerToken[]>): any {
    let result = {
      global: [],
      const: [],
      dim: [],
      fn: [],
      type: [],
    };

    lexerCode.forEach((lexerTokens: LexerToken[]) => {
      for (let i = 0; i < lexerTokens.length; i++) {
        if (lexerTokens[i].which === LexerTokenCategory.INDIVIDUAL) {
          if (
            i > 0 &&
            lexerTokens[i - 1].which === LexerTokenCategory.KEYWORD
          ) {
            //console.info('Previous token is a key word:', lexerTokens[i-1]);
            let keywordValue = (lexerTokens[i - 1]
              .value as string).toLowerCase();
            switch (keywordValue) {
              case 'global':
                if (result.global.indexOf(keywordValue) === -1) {
                  result.global.push(lexerTokens[i].value);
                }
                break;
              case 'const':
                if (result.const.indexOf(keywordValue) === -1) {
                  result.const.push(lexerTokens[i].value);
                }
                break;
              case 'dim':
                if (result.dim.indexOf(keywordValue) === -1) {
                  result.dim.push(lexerTokens[i].value);
                }
                break;
              case 'function':
                if (result.fn.indexOf(keywordValue) === -1) {
                  result.fn.push(lexerTokens[i].value);
                }
                break;
              case 'type':
                if (result.type.indexOf(keywordValue) === -1) {
                  result.type.push(lexerTokens[i].value);
                }
                break;
            }
          }
        }
      }
    });

    return result;
  }

  /**
   * Retrieves all local variables from a given lexer code.
   * If a function name is passed, only local variables of this function will be retrieved.
   * Otherwise, all local variables of all code functions will be retrieved.
   * @param lexerCode
   * @param fn
   */
  getLocals(lexerCode: Array<LexerToken[]>, fn?: string): any {
    if (fn) {
    }
  }

  /** RULES **/
  // [Num]: int | float | Pi
  // [Str]: string
  // [Bool]: True | False
  // [Expr]: [NumExpr] | [StrExpr] | [BoolExpr] | [Bool] | [Num] | [Str]
  // [NumExpr]: [Num] + [Num] | [Num] - [Num] | [Num] * [Num] | [Num] / [Num] | [Num] ^ [Num]
  // [StrExpr]: [Str] | [Str] + [Str] | [Str] + [Num] | [Str] + [Bool]
  // [BoolExpr]: [Bool] | [And] | [Or] | [Xor] | [Not]
  // [Ind]: $individual
  // [Ind+]: [Ind] | [Ind], [Ind+]
  // [Assign]: [Ind] = [Expr]
  // [Param]: [Ind] | [Assign]
  // [Cond]: [BoolExpr] | [Expr] = [Expr] | [Expr] < [Expr] | [Expr] > [Expr] | [Expr] <= [Expr] | [Expr] >= [Expr] | [Expr] <> [Expr]
  // Global [Ind]+
  // Local [Ind]+
  // Case [Ind]+ | Case [Expr]+
  // Default
  // Else | Else If [Cond] | Else If [Cond] Then
  // ElseIf [Cond] | ElseIf [Cond] Then
  // EndIf
  // If [Cond] | If [Cond] Then
  // Select [Ind]
  // [After]: After [ObjIndex]? [Ind]
  // [Before]: Before [ObjIndex]? [Ind]
  // Delete [Ind]
  // [First]: First [Ind]
  // [Last]: Last [Ind]
  // Insert [Ind] [Before | After]? [Ind]
  // [New]: New [Ind]
  // Null
  // TODO Object.[Type]
  // Type [Ind]
  // Field [Ind]
  // End | End Type | End Function | End If | End Select
  // Include [StrExpr]
  // Stop
  // Data [Expr]+
  // Dim [Ind]+
  // For [Assign] To [NumExpr] [Step [NumExpr]]? | For [Ind] = Each [Ind]
  // Const [Ind]+
  // MainLoop
  // Return [Expr]?
  // Exit
  // Forever
  // Next
  // Repeat
  // Until [Cond]
  // Wend
  // While [Cond]
  // [Mod]: [NumExpr] Mod [NumExpr]
  // [Not]: Not [BoolExpr]
  // [And]: [BoolExpr] And [BoolExpr]
  // [Or]: [BoolExpr] Or [BoolExpr]
  // [Xor]: [BoolExpr] Xor [BoolExpr]
  // Function [Ind] ([Param]*)
  // [Label]: .[Ind]
  // Restore [Label]
  // Read [Ind]+
  // [Ind] = Handle [Ind]
  // [Sar]: [NumExpr] Sar [NumExpr]
  // [Sar]: [NumExpr] Shl [NumExpr]
  // [Sar]: [NumExpr] Shr [NumExpr]
  createAbstractSyntax(lexerCode: Array<LexerToken[]>): AbstractSyntax {
    // reset game code
    this.abstractSyntax = {
      globals: [],
      codeBlocks: [],
      mainLoop: [],
      functions: [],
      types: [],
    };

    // parse code line by line
    lexerCode.forEach((lexerTokens: LexerToken[]) => {
      // perform token cleanup: remove comments
      const obsoleteTokenCategories: LexerTokenCategory[] = [
        LexerTokenCategory.COMMENT_MARKER,
        LexerTokenCategory.COMMENT,
      ];
      lexerTokens = lexerTokens.filter(
        (token: LexerToken) => !obsoleteTokenCategories.includes(token.which)
      );

      console.info('INITIAL TOKENS:', lexerTokens);

      /*
       * Entry points:
       * // -declaration: Global | Local | Const | Dim
       *    -> can be combined with assignment
       * // -assignment: foo = 42
       * // -label: .label
       * // -command call: Graphics 640,480
       * // -function call: PrintText("Hello World")
       * // -loop begin: For | While | Repeat
       * // -loop break: Exit
       * // -loop end: Next | Wend | Until | Forever
       * // -condition: If x=y [Then] | ElseIf | Else If
       * // -condition end: EndIf | End If
       * // -selection head: Select variable
       * // -selection body: Case | Default
       * // -selection end: End Selection
       * // -function definition: Function foo(a, b, c)
       * // -function return: Return [...]
       * // -function end: End Function
       * // -type definition: Type Alien
       * // -type body: Field x, y, z
       * // -type end: End Type
       * // -object deletion: Delete alien
       * // -object insertion: Insert ...
       * // -script inclusion: Include script.bbs
       * // -debug stop: Stop
       * // -data definition: Data ...
       * // -restore data: Restore
       * // -read data: Read
       * // -main loop: MainLoop
       * // -main loop end: End MainLoop
       * // -quit program: end
       */
      this.parseState(ParserState.INITIAL, lexerTokens);

      //TODO: this is only a very basic parsing function
      // remove double quote and comma tokens
      // lexerTokens.forEach((token: LexerToken, index: number) => {
      //   if (token.which === LexerTokenCategory.DOUBLE_QUOTE) {
      //     lexerTokens.splice(index, 1);
      //   }
      // });

      // if (lexerTokens.length === 0) {
      //   return;
      // }

      // const firstToken = lexerTokens[0];

      // if (firstToken.which === LexerTokenCategory.COMMAND) {
      //   console.info('COMMAND FOUND');
      //   this.simpleCommandParser(lexerTokens, false);
      // } else if (firstToken.which === LexerTokenCategory.KEYWORD && firstToken.value.toLowerCase() === 'global') {
      //   console.info('GLOBAL FOUND');
      //   lexerTokens.shift();
      //   this.parseGlobals(lexerTokens);
      //   // const varName = lexerTokens[1].value;
      //   // switch (lexerTokens[3].which) {
      //   //   case LexerTokenCategory.COMMAND:
      //   //     this.simpleCommandParser(lexerTokens.splice(4), true);
      //   //     break;
      //   //   case LexerTokenCategory.INTEGER:
      //   //   case LexerTokenCategory.FLOAT:
      //   //     this.gameState.setGlobal(varName, Number(lexerTokens[3].value));
      //   //     break;
      //   //   case LexerTokenCategory.STRING:
      //   //     this.gameState.setGlobal(varName, lexerTokens[3].value);
      //   //     break;
      //   //   case LexerTokenCategory.KEYWORD:
      //   //     if (['true', 'false'].indexOf(lexerTokens[3].value.toLowerCase()) > -1) {
      //   //       this.gameState.setGlobal(varName, lexerTokens[3].value);
      //   //     } else {
      //   //       console.error('Invalid key word (only True and False are allowed)');
      //   //     }
      //   //     break;
      //   //   default:
      //   //     console.error('Found invalid token:', lexerTokens[3]);
      //   // }
      // } else {
      //   console.error('First token MUST BE a command or the "Global" keyword!', lexerTokens[0]);
      // }
    });

    console.info('Game State:', this.gameState);
    console.info('Abstract Syntax:', this.abstractSyntax);
    return this.abstractSyntax;
  }

  parseGlobal(global: LexerToken[]) {
    let variableName: string;
    let context: GlobalContext = 'variable' as GlobalContext;
    global.forEach((token: LexerToken, index: number) => {
      switch (context) {
        case 'variable':
          if (token.which === LexerTokenCategory.VARIABLE) {
            variableName = (token.value as string).toLowerCase();
            context = 'commaOrAssignment';
          } else {
            console.error(
              'Invalid global assignment (missing variable name)',
              token
            );
          }
          break;
        case 'commaOrAssignment':
          if (token.which === LexerTokenCategory.COMMA) {
            this.abstractSyntax.codeBlocks.push({
              type: ParserStatementType.GLOBAL,
              name: variableName,
              value: null,
            });
            context = 'variable';
          } else if (token.which === LexerTokenCategory.ASSIGNMENT) {
            context = 'expression';
          } else {
            console.error(
              'Invalid token following global variable name (must be comma or assignment)'
            );
          }
          break;
        case 'expression':
          const remainingTokens: LexerToken[] = global.splice(index);
          this.parseExpression(remainingTokens);

          if (token.which === LexerTokenCategory.COMMAND) {
            const cmdResponse: CommandResponse = this.simpleCommandParser(
              global.slice(2),
              true
            ) as CommandResponse;
            this.abstractSyntax.codeBlocks.push({
              global: variableName,
              category: cmdResponse.category,
              command: cmdResponse.command,
              params: cmdResponse.params,
            });
            return;
          }
      }
    });
  }

  simpleCommandParser(
    initialTokens: LexerToken[],
    withReturn: boolean
  ): void | CommandResponse {
    // console.info('simpleCommandParser:', initialTokens);

    // for the moment, remove all commas
    let reducedTokens: LexerToken[] = [];
    initialTokens.forEach((token: LexerToken) => {
      if (token.which !== LexerTokenCategory.COMMA) {
        reducedTokens.push(token);
      }
    });

    let firstToken = reducedTokens[0];

    // get all params
    const cmdFromJson = this.language.commands[
      (firstToken.value as string).toLowerCase()
    ];
    let params: { name: string; optional: boolean }[] = cmdFromJson.params;
    let minParams: number = 0;
    const maxParams: number = params.length;
    params.forEach((param) => {
      if (!param.optional) {
        minParams++;
      }
    });

    // check if amount of params fits
    let commandParams: number = reducedTokens.length - 1;
    if (commandParams >= minParams && commandParams <= maxParams) {
      reducedTokens.shift(); // remove command itself
      const finalParams: any[] = [];
      reducedTokens.forEach((t) => {
        if (t.which === LexerTokenCategory.VARIABLE) {
          finalParams.push(this.gameState.getGlobal(t.value as string)); // this function must NOT be called here!
        } else if (
          [LexerTokenCategory.INTEGER, LexerTokenCategory.FLOAT].indexOf(
            t.which
          ) > -1
        ) {
          // convert numbers to correct numbers
          finalParams.push(Number(t.value));
        } else {
          finalParams.push(t.value);
        }
      });

      // push new statement to game code
      const cmdCall = (firstToken.value as string).replace(/^\w/, (c) =>
        c.toLowerCase()
      );
      // console.info(`${cmdFromJson.category} ${cmdCall}`);
      if (withReturn) {
        return {
          category: cmdFromJson.category,
          command: cmdCall,
          params: finalParams,
        };
      } else {
        this.abstractSyntax.codeBlocks.push({
          category: cmdFromJson.category,
          command: cmdCall,
          params: finalParams,
        });
      }
    } else {
      console.error(
        `Invalid number of command parameters (must be in range ${minParams} - ${maxParams}, but given ${commandParams})`
      );
    }
  }

  parseState(state: ParserState, tokens: LexerToken[]): any {
    //investigate first token, which is relevant for the current state
    let firstToken: LexerToken = tokens[0];
    console.info('Parsing First Token', firstToken);

    let validTokenCategories: LexerTokenCategory[];

    switch (state) {
      case ParserState.INITIAL:
        validTokenCategories = [
          LexerTokenCategory.CONST,
          LexerTokenCategory.GLOBAL,
          LexerTokenCategory.COMMAND,
          LexerTokenCategory.LABEL_DOT,
          LexerTokenCategory.INDIVIDUAL,
        ];
        if (!validTokenCategories.includes(firstToken.which)) {
          console.error('Invalid token category:', firstToken);
          return;
        }

        switch (firstToken.which) {
          case LexerTokenCategory.CONST:
            let context: ConstContext = 'name' as ConstContext;
            let newConst: ConstStatement = {
              type: ParserStatementType.CONST,
              name: '',
              value: null,
            };
            for (let i = 1; i < tokens.length; i++) {
              const currentInnerToken = tokens[i];
              switch (context) {
                case 'name':
                  if (currentInnerToken.which === LexerTokenCategory.VARIABLE) {
                    newConst.name = currentInnerToken.value as string;
                    context = 'assignmentOrComma';
                  } else {
                    console.error(
                      'Constant must have a name',
                      currentInnerToken
                    );
                  }
                  break;
                case 'assignmentOrComma':
                  if (
                    currentInnerToken.which === LexerTokenCategory.ASSIGNMENT
                  ) {
                    context = 'value';
                  } else if (
                    currentInnerToken.which === LexerTokenCategory.COMMA
                  ) {
                    // push newConst to abstract syntax and reset its values
                    this.abstractSyntax.codeBlocks.push({ ...newConst });
                    newConst.name = '';
                    newConst.value = '';
                    context = 'name';
                  } else {
                    console.error(
                      'Constant name must be followed by either a comma or assignment'
                    );
                  }
                  break;
                case 'value':
                  const validCategories: LexerTokenCategory[] = [
                    LexerTokenCategory.INTEGER,
                    LexerTokenCategory.FLOAT,
                    LexerTokenCategory.STRING,
                    LexerTokenCategory.BOOLEAN,
                  ];
                  if (validCategories.includes(currentInnerToken.which)) {
                    newConst.value = currentInnerToken.value;
                    // push newConst to abstract syntax and reset its values
                    this.abstractSyntax.codeBlocks.push({ ...newConst });
                    newConst.name = '';
                    newConst.value = '';
                    context = 'comma';
                  } else {
                    console.error(
                      'Invalid data type (must be Integer, Float, String or Boolean)'
                    );
                  }
                  break;
                case 'comma':
                  context = 'name';
              }
            }
            break;

          case LexerTokenCategory.GLOBAL:
            tokens.shift(); // remove first token ("global")
            const globals: LexerToken[][] = [];
            let currentGlobal: LexerToken[] = [];
            tokens.forEach((token: LexerToken) => {
              if (token.which === LexerTokenCategory.COMMA) {
                globals.push([...currentGlobal]);
                currentGlobal = [];
              } else {
                currentGlobal.push(token);
              }
            });
            if (currentGlobal.length > 0) {
              globals.push([...currentGlobal]);
            }

            console.info('Globals', globals);
            globals.forEach((global: LexerToken[]) => {
              this.parseGlobal(global);
            });

          case LexerTokenCategory.LOCAL:
          case LexerTokenCategory.DIM:
            this.parseState(ParserState.DECLARATION, tokens);
            break;
          case LexerTokenCategory.FOR:
          case LexerTokenCategory.WHILE:
          case LexerTokenCategory.REPEAT:
            this.parseState(ParserState.LOOP_HEAD, tokens);
            break;
          case LexerTokenCategory.EXIT:
            this.parseState(ParserState.LOOP_BREAK, tokens);
            break;
          case LexerTokenCategory.NEXT:
          case LexerTokenCategory.WEND:
          case LexerTokenCategory.UNTIL:
          case LexerTokenCategory.FOREVER:
            this.parseState(ParserState.LOOP_END, tokens);
            break;
          case LexerTokenCategory.IF:
          case LexerTokenCategory.ELSEIF:
          case LexerTokenCategory.ELSE:
            this.parseState(ParserState.CONDITION_HEAD, tokens);
            break;
          case LexerTokenCategory.ENDIF:
            this.parseState(ParserState.CONDITION_END, tokens);
            break;
          case LexerTokenCategory.SELECT:
            this.parseState(ParserState.SELECTION_HEAD, tokens);
            break;
          case LexerTokenCategory.CASE:
          case LexerTokenCategory.DEFAULT:
            this.parseState(ParserState.SELECTION_BODY, tokens);
            break;
          case LexerTokenCategory.FUNCTION:
            this.parseState(ParserState.FUNCTION_HEAD, tokens);
            break;
          case LexerTokenCategory.RETURN:
            this.parseState(ParserState.FUNCTION_RETURN, tokens);
            break;
          case LexerTokenCategory.TYPE:
            this.parseState(ParserState.TYPE_HEAD, tokens);
            break;
          case LexerTokenCategory.FIELD:
            this.parseState(ParserState.TYPE_BODY, tokens);
            break;
          case LexerTokenCategory.DELETE:
            this.parseState(ParserState.OBJECT_DELETION, tokens);
            break;
          case LexerTokenCategory.INSERT:
            this.parseState(ParserState.OBJECT_INSERTION, tokens);
            break;
          case LexerTokenCategory.INCLUDE:
            this.parseState(ParserState.INCLUDE, tokens);
            break;
          case LexerTokenCategory.STOP:
            this.parseState(ParserState.DEBUG_STOP, tokens);
            break;
          case LexerTokenCategory.DATA:
            this.parseState(ParserState.DATA_DEFINITION, tokens);
            break;
          case LexerTokenCategory.RESTORE:
            this.parseState(ParserState.RESTORE_DATA, tokens);
            break;
          case LexerTokenCategory.READ:
            this.parseState(ParserState.READ_DATA, tokens);
            break;
          case LexerTokenCategory.MAINLOOP:
            this.parseState(ParserState.MAIN_LOOP_HEAD, tokens);
            break;
          case LexerTokenCategory.END:
            if (tokens.length > 1) {
              switch (tokens[1].which) {
                case LexerTokenCategory.KEYWORD:
                  switch ((tokens[1].value as string).toLowerCase()) {
                    case 'function':
                      this.parseState(ParserState.FUNCTION_END, tokens);
                      break;
                    case 'type':
                      this.parseState(ParserState.TYPE_END, tokens);
                      break;
                    case 'if':
                      this.parseState(ParserState.CONDITION_END, tokens);
                      break;
                    case 'select':
                      this.parseState(ParserState.SELECTION_END, tokens);
                      break;
                    case 'mainloop':
                      this.parseState(ParserState.MAIN_LOOP_END, tokens);
                  }
                  break;
                default:
                //TODO error: end must be followed by another keyword
              }
            } else {
              this.parseState(ParserState.QUIT_PROGRAM, tokens);
            }
            break;
          case LexerTokenCategory.COMMAND:
            const params = this.parseState(ParserState.COMMAND_CALL, tokens);
            this.abstractSyntax.codeBlocks.push({
              type: ParserStatementType.COMMAND,
              name: firstToken.value,
              params: params,
            });
            break;
          case LexerTokenCategory.LABEL_DOT:
            this.parseState(ParserState.LABEL, tokens);
            break;
          case LexerTokenCategory.INDIVIDUAL:
            let hasAssignment = false;
            tokens.forEach((token) => {
              if (token.which === LexerTokenCategory.ASSIGNMENT) {
                hasAssignment = true;
              }
            });

            if (hasAssignment) {
              this.parseState(ParserState.ASSIGNMENT, tokens);
            } else {
              this.parseState(ParserState.FUNCTION_CALL, tokens);
            }
          default:
            console.error('Invalid key word:', firstToken);
        }

      case ParserState.DECLARATION:
        // these are not the key words but the actual variables!
        validTokenCategories = [LexerTokenCategory.VARIABLE];
        if (validTokenCategories.indexOf(firstToken.which) === -1) {
          console.error('Invalid token category');
        }

        if (tokens.length === 0) {
          //No following tokens: Insert declaration statement
          this.abstractSyntax.globals[firstToken.value as string] = 0;
        } else {
          //Valid following tokens: , =
          switch (tokens[0].which) {
            case LexerTokenCategory.COMMA:
              this.abstractSyntax.globals[firstToken.value as string] = 0;
              this.parseState(ParserState.DECLARATION, tokens);
              break;
            case LexerTokenCategory.ASSIGNMENT:
              this.parseState(ParserState.ASSIGNMENT, tokens);
              break;
            default:
              console.error('Invalid token following a declaration');
          }
        }

        break;
      case ParserState.ASSIGNMENT:
        //Valid following tokens: ( [Number] [String] True False Pi First Last [Individual] [Command]
        break;
      case ParserState.COMMAND_CALL:
        console.info('Command call with', tokens);

        let commandName = tokens[0].value as string;
        let command: ApiCommand = this.language.commands[
          commandName.toLowerCase()
        ];
        console.info('Command:', command);

      // let service: string = `commands${command.category.charAt(0).toUpperCase()}${command.category.slice(
      //   1
      // )}${command.subCategory.charAt(0).toUpperCase()}${command.subCategory.slice(1)}`;
      // console.info('Service:', service);
    }
  }

  parseCondition(tokens: LexerToken[]) {
    let linkValues: string[] = ['And', 'Or', 'Xor'];

    //find all expressions
    let expressions: Array<LexerToken[]> = [];
    let currentExpression: LexerToken[] = [];
    let links: LexerToken[] = [];
    tokens.forEach((token: LexerToken) => {
      if (
        token.which === LexerTokenCategory.KEYWORD &&
        linkValues.indexOf(token.value as string) > -1
      ) {
        links.push(token);

        if (currentExpression.length > 0) {
          expressions.push(currentExpression);
          currentExpression = [];
        }
      } else {
        currentExpression.push(token);
      }
    });
    if (currentExpression.length > 0) {
      expressions.push(currentExpression);
    }

    console.info('Expressions:', expressions);
    console.info('Links:', links);

    expressions.forEach((expression: LexerToken[]) => {
      this.parseExpression(expression);
    });
  }

  /**
   * Parses a comparison based on the comparison operator's index.
   * @param tokens A lexer token array
   * @param compIndex The position of the comparison operator
   */
  parseComparison(tokens: LexerToken[], compIndex: number) {
    //[Expr] = [Expr] | [Expr] < [Expr] | [Expr] > [Expr] | [Expr] <= [Expr] | [Expr] >= [Expr] | [Expr] <> [Expr]
    //TODO
  }

  parseLogicalLink(tokens: LexerToken[], linkIndex: number) {
    // [And]: [BoolExpr] And [BoolExpr]
    // [Or]: [BoolExpr] Or [BoolExpr]
    // [Xor]: [BoolExpr] Xor [BoolExpr]

    let expectedTokens = [
      LexerTokenCategory.INTEGER,
      LexerTokenCategory.FLOAT,
      LexerTokenCategory.STRING,
    ];
    let validLeftExpression;

    //parse left hand boolean expression
    for (let leftIndex = linkIndex - 1; leftIndex >= 0; leftIndex--) {
      let currentToken = tokens[leftIndex];
      if (expectedTokens.indexOf(currentToken.which) > -1) {
      }
    }
  }

  parseExpression(expression: LexerToken[]) {
    console.info('Parse Expression', expression);

    // check if expression has valid brackets
    let openBrackets: number = 0;
    expression.forEach((token: LexerToken) => {
      if (token.which === LexerTokenCategory.BRACKET_OPEN) {
        openBrackets++;
      } else if (token.which === LexerTokenCategory.BRACKET_CLOSE) {
        if (openBrackets === 0) {
          console.error(
            'Invalid expression (closing brackets without opening)'
          );
          return;
        } else {
          openBrackets--;
        }
      }
    });
    if (openBrackets !== 0) {
      console.error('Invalid expression (open brackets without closing)');
      return;
    }

    console.info('Valid bracket settings');

    expression.forEach((token: LexerToken) => {
      switch (token.which) {
        case LexerTokenCategory.INTEGER:
        case LexerTokenCategory.FLOAT:
        case LexerTokenCategory.STRING:
        case LexerTokenCategory.BOOLEAN:
          break;
      }
    });
  }

  // split expression by operator considering parentheses
  split(expression: string, operator: string): string[] {
    const result: string[] = [];
    let braces: number = 0;
    let currentChunk: string = '';
    for (let i = 0; i < expression.length; ++i) {
      const currentChar = expression[i];
      if (currentChar === '(') {
        braces++;
      } else if (currentChar === ')') {
        braces--;
      }

      if (braces === 0 && operator === currentChar) {
        result.push(currentChunk);
        currentChunk = '';
      } else {
        currentChunk += currentChar;
      }
    }
    if (currentChunk != '') {
      result.push(currentChunk);
    }
    console.info(`Split by ${operator}:`, result);
    return result;
  }

  splitTokens(tokens: LexerToken[], operator: LexerToken): any {
    const result: LexerToken[][] = [];
    let braces: number = 0;
    let currentTokens: LexerToken[] = [];
    for (let i = 0; i < tokens.length; ++i) {
      const currentToken: LexerToken = tokens[i];
      if (currentToken.which === LexerTokenCategory.BRACKET_OPEN) {
        braces++;
      } else if (currentToken.which === LexerTokenCategory.BRACKET_CLOSE) {
        braces--;
      }

      if (braces === 0 && operator.which === currentToken.which) {
        result.push(currentTokens);
        currentTokens = [];
      } else {
        currentTokens.push(currentToken);
      }
    }
    if (currentTokens.length > 0) {
      result.push(currentTokens);
    }
    console.info(`Split by ${operator}:`, result);
    return result;
  }

  // this will only take strings containing * operator [ no + ]
  parseMultiplicationSeparatedExpression(expression: string): number {
    const numbersString: string[] = this.split(expression, '*');
    const numbers: number[] = numbersString.map((noStr) => {
      if (noStr[0] == '(') {
        const expr = noStr.substr(1, noStr.length - 2);
        // recursive call to the main function
        return this.parsePlusSeparatedExpression(expr);
      }
      return +noStr; // convert string to number
    });
    const initialValue = 1.0;
    const result = numbers.reduce(
      (acc: number, no: number) => acc * no,
      initialValue
    );
    return result;
  }

  // parseMultiplicationSeparatedTokens(tokens: LexerToken[]): any {
  //   const numbersString: string[] = this.splitTokens(tokens, '*');
  //   const numbers: number[] = numbersString.map(noStr => {
  //     if (noStr[0] == '(') {
  //       const expr = noStr.substr(1, noStr.length - 2);
  //       // recursive call to the main function
  //       return this.parsePlusSeparatedExpression(expr);
  //     }
  //     return +noStr;  // convert string to number
  //   });
  //   const initialValue = 1.0;
  //   const result = numbers.reduce((acc: number, no: number) => acc * no, initialValue);
  //   return result;
  // }

  // both * -
  parseMinusSeparatedExpression(expression: string): number {
    const numbersString: string[] = this.split(expression, '-');
    console.info('Numbers String (minus):', numbersString);
    const numbers: number[] = numbersString.map((noStr) =>
      this.parseMultiplicationSeparatedExpression(noStr)
    );
    console.info('Numbers (minus):', numbers);
    const initialValue: number = numbers[0];
    const result: number = numbers
      .slice(1)
      .reduce((acc, no) => acc - no, initialValue);
    return result;
  }

  // parseMinusSeparatedTokens(tokens: LexerToken[]): any {
  //   const numbersString: string[] = this.splitTokens(tokens, '-');
  //   console.info('Numbers String (minus):', numbersString);
  //   const numbers: number[] = numbersString.map(noStr => this.parseMultiplicationSeparatedExpression(noStr));
  //   console.info('Numbers (minus):', numbers);
  //   const initialValue: number = numbers[0];
  //   const result: number = numbers.slice(1).reduce((acc, no) => acc - no, initialValue);
  //   return result;
  // }

  // * - +
  parsePlusSeparatedExpression(expression: string): number {
    const numbersString: string[] = this.split(expression, '+');
    console.info('Numbers string:', numbersString);
    const numbers: number[] = numbersString.map((noStr) =>
      this.parseMinusSeparatedExpression(noStr)
    );
    console.info('Numbers:', numbers);
    const initialValue: number = 0.0;
    const result: number = numbers.reduce((acc, no) => acc + no, initialValue);
    return result;
  }

  // parsePlusSeparatedTokens(tokens: LexerToken[]): any {
  //   const numbersString: string[] = this.split(tokens, '+');
  //   console.info('Numbers string:', numbersString);
  //   const numbers: number[] = numbersString.map(noStr => this.parseMinusSeparatedExpression(noStr));
  //   console.info('Numbers:', numbers);
  //   const initialValue: number = 0.0;
  //   const result: number = numbers.reduce((acc, no) => acc + no, initialValue);
  //   return result;
  // }

  // parses a string consisting of mathematical terms
  parse(expression: string): number {
    // remove space characters
    const result: number = this.parsePlusSeparatedExpression(
      expression.replace(/\s/g, '')
    );
    console.info('RESULT:', result);
    return result;
  }

  parseTokens(tokens: LexerToken[]): any {
    const result: number = 0; // this.parsePlusSeparatedTokens(tokens);
    console.info('RESULT:', result);
    return result;
  }

  //TODO code must be executed later, for the services are not initialized yet
  // this.graphics2d.graphics(800, 600),
  // //this.graphics2d.cameraClsColor(255,0,0),  //TODO wrong implementation, fix
  // this.generalService.assign({
  //   variable: 'i',
  //   type: 'global',
  //   expression: {
  //     value: of(42)
  //   }
  // }),

  // //CAMERA
  // this.generalService.assign({
  //   variable: 'camera',
  //   type: 'global',
  //   expression: {
  //     value: this.graphics3d.createCamera(CameraType.FREE)
  //   }
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('camera').subscribe((camera: GameEntity) => {
  //     this.graphics3d.positionEntity(camera, 0, 2, -5).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('camera').subscribe((camera: Camera) => {
  //     this.graphics3d.cameraClsColor(camera, 50, 200, 240).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),

  // //LIGHT
  // this.generalService.assign({
  //   variable: 'light',
  //   type: 'global',
  //   expression: {
  //     value: this.graphics3d.createLight(1)
  //   }
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('light').subscribe((light: Light) => {
  //     this.graphics3d.lightColor(light, 255, 255, 0).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),

  // //PRIMITIVE MESH
  // this.generalService.assign({
  //   variable: 'cube',
  //   type: 'global',
  //   expression: {
  //     value: this.graphics3d.createCube()
  //   }
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('cube').subscribe((cube: GameEntity) => {
  //     this.graphics3d.positionEntity(cube, 0, 1, 0).subscribe(done => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('cube').subscribe((cube: GameEntity) => {
  //     this.graphics3d.entityColor(cube, 0, 255, 0).subscribe(done => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),

  // this.graphics3d.ambientLight(128, 200, 50),

  // //2D GRAPHICS
  // this.graphics2d.color(0, 128, 0),

  // //this.commandsBasicsTimeRandom.delay(2000),

  // this.graphics2d.oval(50, 200, 20, 40, false),
  // this.graphics2d.line(300, 40, 350, 120),

  // //this.graphics2d.color(255, 255, 0),
  // this.graphics2d.plot(200, 200),

  // //IMAGE
  // this.graphics2d.autoMidHandle(true),
  // this.generalService.assign({
  //   variable: 'image',
  //   type: 'global',
  //   expression: {
  //     value: this.graphics2d.loadImage('/assets/gfx/face.png')
  //   }
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('image').subscribe((image: GameImage2D) => {
  //     this.graphics2d.resizeImage(image, 128, 128).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('image').subscribe((image: GameImage2D) => {
  //     this.graphics2d.rotateImage(image, 30).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('image').subscribe((image: GameImage2D) => {
  //     this.graphics2d.drawBlock(image, 200, 250).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),
  // this.graphics2d.rect(195, 245, 10, 10, true),
  // this.graphics2d.rect(195 - 64, 245 - 64, 10, 10, true),

  // //TEXT
  // this.generalService.assign({
  //   variable: 'font',
  //   type: 'global',
  //   expression: {
  //     value: this.graphics2d.loadFont('Arial', 32, true, true, true)
  //   }
  // }),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('font').subscribe((font: GameFont) => {
  //     this.graphics2d.setFont(font).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // }),

  // this.graphics2d.text(50, 50, 'HELLO WORLD!'),
  // this.graphics2d.stringWidth('HELLO WORLD!'),
  // this.graphics2d.stringHeight('HELLO WORLD!'),
  // this.generalService.assign({
  //   variable: 'rndValue',
  //   type: 'global',
  //   expression: {
  //     value: of('Hello World')
  //   }
  // }),
  // this.basics.seedRnd('Hello World'),
  // new Observable(observer => {
  //   this.gameState.getGlobal$('image').subscribe((image: GameImage2D) => {
  //     this.graphics2d.maskImage(image, 255, 0, 255).subscribe(() => {
  //       observer.next();
  //       observer.complete();
  //     });
  //   });
  // })
}
