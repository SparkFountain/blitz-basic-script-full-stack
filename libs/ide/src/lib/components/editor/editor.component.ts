import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';

import { CaretPosition, ColorScheme } from '@blitz-basic-script/ide';

import { LexerService } from '@blitz-basic-script/script-language';
import { Code } from '../../interfaces/code';
import { UndoRedoAction } from '../../classes/undo-redo-action';
import { LexerToken } from 'libs/script-language/src/lib/lexer/interfaces/lexer-token';

@Component({
  selector: 'blitz-basic-script-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  @Input() buttons: string[];
  @Input('code') initialCode: string[];

  @ViewChild('codingArea', { static: false }) codingArea: ElementRef;

  public settingsOpen: boolean;
  public caret: { x: number; y: number; top: number; left: number };

  public code: Code;

  public colorScheme: ColorScheme;

  public playing: boolean;
  public action: 'idle' | 'play' | 'debug' | 'stop';

  public undoRedoStack: UndoRedoAction[];

  // @HostListener('document:keydown', ['$event']) onKeydownHandler(
  //   event: KeyboardEvent
  // ) {
  //   if (this.playing) {
  //     return;
  //   }

  //   console.info('[KEY DOWN]', event);

  //   const previousLine = this.code.plain[this.caret.y - 1];
  //   let currentLine = this.code.plain[this.caret.y];
  //   const nextLine = this.code.plain[this.caret.y + 1];

  //   let updateCurrentLine = true;

  //   switch (event.code) {
  //     case 'Backspace':
  //       if (this.caret.x > 0) {
  //         currentLine = currentLine.slice(0, -1);
  //         this.caret.x--;
  //       } else {
  //         if (this.caret.y > 0) {
  //           this.code.plain.splice(this.caret.y, 1);
  //           this.caret.y--;
  //           this.caret.x = this.code.plain[this.caret.y].length;
  //         }
  //         updateCurrentLine = false;
  //       }
  //       break;
  //     case 'Enter':
  //     case 'NumpadEnter':
  //       this.caret.x = 0;
  //       this.caret.y++;
  //       this.code.plain.splice(this.caret.y, 0, '');
  //       updateCurrentLine = false;
  //       break;
  //     case 'Space':
  //       event.preventDefault();
  //       currentLine += ' ';
  //       this.caret.x++;
  //       break;
  //     case 'Home':
  //       this.moveCaret('beginOfLine');
  //       break;
  //     case 'End':
  //       this.caret.x = this.code.plain[this.caret.y].length;
  //       break;
  //     case 'ArrowLeft':
  //       event.preventDefault();
  //       this.moveCaret('left');
  //       break;
  //     case 'ArrowRight':
  //       event.preventDefault();
  //       this.moveCaret('right');
  //       break;
  //     case 'ArrowUp':
  //       event.preventDefault();
  //       this.moveCaret('up');
  //       break;
  //     case 'ArrowDown':
  //       event.preventDefault();
  //       this.moveCaret('down');
  //       break;
  //     case 'KeyC':
  //       if (event.ctrlKey) {
  //         // navigator.clipboard
  //         //   .writeText('todo') // TODO: discover selected text
  //         //   .catch(err => {
  //         //     console.log('Clipboard paste error', err);
  //         //   });
  //       } else {
  //         currentLine = this.addCharacter(currentLine, event.key);
  //       }
  //       break;
  //     case 'KeyV':
  //       if (event.ctrlKey) {
  //         navigator.clipboard
  //           .readText()
  //           .then((code: string) => {
  //             this.insertCode(code);
  //           })
  //           .catch((err) => {
  //             console.log('Clipboard paste error', err);
  //           });
  //       } else {
  //         currentLine = this.addCharacter(currentLine, event.key);
  //       }
  //       break;
  //     default:
  //       currentLine = this.addCharacter(currentLine, event.key);
  //   }

  //   this.updateCaretPosition();
  //   if (updateCurrentLine) {
  //     this.code.plain[this.caret.y] = currentLine;
  //   }
  //   this.syntaxHighlighting();
  // }

  constructor(
    private lexer: LexerService,
    private changeDetection: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.settingsOpen = false;
    this.caret = { x: 0, y: 0, top: 0, left: 0 };

    this.initialCode = [''];

    this.code = {
      plain: this.initialCode,
      formatted: [this.initialCode], // TODO: refactor
    };

    this.colorScheme = 'solarized-light';

    this.playing = false;
    this.action = 'idle';
  }

  ngAfterViewChecked(): void {
    // this.updateCaretPosition();
    // this.changeDetection.markForCheck();
  }

  getLineNumberWidth(): string {
    return `${25 + Math.floor(Math.log10(this.code.plain.length)) * 10}px`;
  }

  formatLine(row: number): string {
    const leadingSpacesAmount =
      this.code.plain.length.toString().length - row.toString().length;

    let leadingSpaces = '';
    for (let i = 0; i < leadingSpacesAmount; i++) {
      leadingSpaces += '&nbsp;&nbsp;&nbsp;';
    }

    return `${leadingSpaces}${row}`;
  }

  play(): void {
    this.playing = true;
    this.action = 'play';
  }

  debug(): void {
    this.playing = true;
    setTimeout(() => {
      this.action = 'debug';
      this.changeDetection.markForCheck();
    }, 0);
  }

  stop(): void {
    this.playing = false;
  }

  undo(): void {
    console.warn('[UNDO] Unfinished implementation');

    if (this.undoRedoStack.length > 0) {
      const lastAction: UndoRedoAction = this.undoRedoStack.pop();
      // this.code.plain[lastAction.caret.begin.y] = '';
    }
  }

  redo(): void {
    console.warn('[UNDO] Unfinished implementation');

    if (this.undoRedoStack.length > 0) {
      const lastAction: UndoRedoAction = this.undoRedoStack.pop();
      // this.code.plain[lastAction.caret.begin.y] = '';
    }
  }

  guide(): void {
    console.warn('[CODING GUIDE] Not implemented yet');
  }

  /**
   * Cleanup Rules:
   * - correct indentation
   * - no unnecessary spaces
   * - no unnecessary new lines
   * - surround all commands with brackets (later and only optional)
   */
  codeCleanUp(): void {
    // correct indentation
  }

  toggleSettings(): void {
    this.settingsOpen = !this.settingsOpen;
  }

  addCharacter(currentLine: string, character: string): string {
    if (character.length === 1) {
      this.caret.x++;
      return `${currentLine}${character}`;
    } else {
      return currentLine;
    }
  }

  insertCode(text: string): void {
    // TODO: this is just a basic paste implementation, not final!
    this.code.plain = text.split('\n');
    this.changeDetection.markForCheck();
    this.changeDetection.detectChanges();
  }

  moveCaret(direction: CaretPosition): void {
    switch (direction) {
      case 'up':
        break;
      case 'down':
        break;
      case 'left':
        if (this.caret.x > 0) {
          this.caret.x--;
        } else {
          if (this.caret.y > 0) {
            this.caret.y--;
            this.caret.x = this.code.plain[this.caret.y].length;
          }
          // TODO:
          // updateCurrentLine = false;
        }
        break;
      case 'right':
        break;
      case 'beginOfLine':
        this.caret.x = 0;
        break;
      case 'endOfLine':
        break;
    }
  }

  updateCaretPosition(): void {
    setTimeout(() => {
      this.caret.left =
        this.codingArea.nativeElement.offsetLeft + 88 + this.caret.x * 8.4;
      this.caret.top =
        this.codingArea.nativeElement.offsetTop + 15 + this.caret.y * 21;
    }, 0);
  }

  syntaxHighlighting(): void {
    this.code.formatted = [];

    const tokens: Array<LexerToken[]> = this.lexer.lexCode(this.code.plain);
    console.info('[TOKENS]', tokens);
    tokens.forEach((line: LexerToken[]) => {
      const formattedLine: string[] = [];

      for (let i = 0; i < line.length; i++) {
        const currentToken: LexerToken = line[i];
        const nextToken: LexerToken = i < line.length - 1 ? line[i + 1] : null;

        formattedLine.push(
          `<span class="${this.key2Class(
            currentToken.which
          )}">${currentToken.value.toString()}</span>`
        );
        if (nextToken) {
          const spaceAmount =
            nextToken.offset.x -
            (currentToken.offset.x + currentToken.value.toString().length);
          if (spaceAmount > 0) {
            formattedLine.push(`<span>${'&nbsp;'.repeat(spaceAmount)}</span>`);
          }
        }
      }

      this.code.formatted.push(formattedLine);
    });

    console.info('[FORMATTED CODE]', this.code.formatted);
  }

  key2Class(key: string): string {
    if (key === 'BRACKET_OPEN' || key === 'BRACKET_CLOSE') {
      return 'bracket';
    }

    return key.toLowerCase().replace(/_/g, '-');
  }
}
