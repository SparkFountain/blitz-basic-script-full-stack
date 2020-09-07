import { Injectable } from '@angular/core';
import { GameStateService } from '../../game-state.service';
import { GameFont } from '../../../interfaces/game/font';
import { Render2dService } from '../../render2d.service';

@Injectable()
export class CommandsGraphics2dTextService {
  constructor(private graphics2d: Render2dService, private gameState: GameStateService) {}

  async fontAscent(font: GameFont): Promise<number> {
    return this.graphics2d.fontAscent(font);
  }

  async fontDescent(font: GameFont): Promise<number> {
    return this.graphics2d.fontDescent(font);
  }

  //TODO according to BlitzForum Online Help, the font parameter should not be set: https://www.blitzforum.de/help/fontHeight
  async fontHeight(font: GameFont): Promise<number> {
    return new Promise<number>((resolve: Function, reject: Function) => {
      this.fontAscent(font).then((ascent: number) =>
        this.fontDescent(font).then((descent: number) => {
          return ascent + descent;
        })
      );
    });
  }

  async fontName(font: GameFont): Promise<string> {
    return Promise.resolve(font.name);
  }

  async fontSize(font: GameFont): Promise<number> {
    return Promise.resolve(font.size);
  }

  async fontStyle(font: GameFont): Promise<number> {
    let result = 0;
    if (font.bold) {
      result += 1;
    }
    if (font.italic) {
      result += 2;
    }
    if (font.underline) {
      result += 4;
    }

    return result;
  }

  async fontWidth(font: GameFont): Promise<number> {
    return this.graphics2d.fontWidth(font);
  }

  async freeFont(font: GameFont): Promise<void> {
    font = null;
  }

  async loadFont(
    fontName: string,
    size: number,
    bold?: boolean,
    italic?: boolean,
    underline?: boolean
  ): Promise<GameFont> {
    return {
      name: fontName,
      size: size,
      bold: bold,
      italic: italic,
      underline: underline
    };
  }

  async locate(x: number, y: number): Promise<void> {
    this.gameState.setTextModeOffset({ x: x, y: y });
  }

  // TODO: make this command deprecated?
  async print(text: string): Promise<void> {
    return new Promise<void>((resolve: Function, reject: Function) => {
      let textModeOffset: { x: number; y: number } = this.gameState.getTextModeProperties().offset;
      // this.text(textModeOffset.x, textModeOffset.y, text).subscribe(() => {
      //   //TODO calculate new text mode offset

      //   async resolve();
      // });
    });
  }

  async setFont(font: GameFont): Promise<void> {
    return this.graphics2d.setFont(font);
  }

  async stringHeight(text: string): Promise<number> {
    return this.graphics2d.stringHeight();
  }

  async stringWidth(text: string): Promise<number> {
    return this.graphics2d.stringWidth(text);
  }

  async text(x: number, y: number, text: string, centerX?: boolean, centerY?: boolean): Promise<void> {
    return this.graphics2d.text(x, y, text, centerX, centerY);
  }

  // TODO: make this command deprecated?
  async write(text: string): Promise<void> {}
}
