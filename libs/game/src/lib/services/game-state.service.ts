import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ScreenProperties {
  width: number;
  height: number;
  origin: {
    x: number;
    y: number;
  };
  color: {
    red: number;
    green: number;
    blue: number;
  };
  clsColor: {
    red: number;
    green: number;
    blue: number;
  };
  viewport: {
    beginX: number;
    beginY: number;
    width: number;
    height: number;
  };
}

export interface ImagesProperties {
  autoMidHandle: boolean;
}

export interface TextModeProperties {
  offset: {
    x: number;
    y: number;
  };
}

export interface AppProperties {
  title: string;
  antiAliasing: boolean;
  wireFrame: boolean;
}

@Injectable()
export class GameStateService {
  private global: object;
  private dim: object;
  private function: object;
  private type: object;

  private keyAscii: number;
  private keyDown: object;
  private keyHit: object;
  private mouseDown: object;
  private mouseHit: object;

  private screen: ScreenProperties;
  private images: ImagesProperties;
  private textMode: TextModeProperties;

  private app: AppProperties;

  constructor() {
    this.global = {};
    this.dim = {};
    this.function = {};
    this.type = {};

    this.keyAscii = -1;
    this.keyDown = {};
    this.keyHit = {};
    this.mouseDown = {};
    this.mouseHit = {};

    this.app = {
      title: '',
      antiAliasing: true,
      wireFrame: false,
    };

    this.screen = {
      width: 400,
      height: 300,
      origin: {
        x: 0,
        y: 0,
      },
      color: {
        red: 1,
        green: 1,
        blue: 1,
      },
      clsColor: {
        red: 0,
        green: 0,
        blue: 0,
      },
      viewport: {
        beginX: 0,
        beginY: 0,
        width: 400,
        height: 300,
      },
    };

    this.images = {
      autoMidHandle: false,
    };

    this.textMode = {
      offset: { x: 0, y: 0 },
    };
  }

  public get(property: string): any {
    if (!this.hasOwnProperty(property)) {
      console.error('Game State has no property ' + property + ':', this);
      return null;
    } else {
      return this[property];
    }
  }

  public getScreenProperties(): ScreenProperties {
    return this.screen;
  }

  public setScreenWidth(width: number): void {
    this.screen.width = width;
  }

  public setScreenHeight(height: number): void {
    this.screen.height = height;
  }

  public setScreenOrigin(origin: { x: number; y: number }): void {
    this.screen.origin = origin;
  }

  public setScreenColor(color: {
    red: number;
    green: number;
    blue: number;
  }): void {
    this.screen.color = color;
  }

  public setScreenClsColor(clsColor: {
    red: number;
    green: number;
    blue: number;
  }): void {
    this.screen.clsColor = clsColor;
  }

  public setScreenViewport(viewport: {
    beginX: number;
    beginY: number;
    width: number;
    height: number;
  }): void {
    this.screen.viewport = viewport;
  }

  public getImagesProperties(): ImagesProperties {
    return this.images;
  }

  public setImagesAutoMidHandle(active: boolean): void {
    this.images.autoMidHandle = active;
  }

  public getTextModeProperties(): TextModeProperties {
    return this.textMode;
  }

  public setTextModeOffset(offset: { x: number; y: number }): void {
    this.textMode.offset = offset;
  }

  //TODO which of the below methods are still in use? remove the others...

  public set(property: string, value: any): void {
    this[property] = value;
  }

  setGlobal(variableName: string, value: any): any {
    console.info('Set Global:', variableName, value);
    this.global[variableName] = value;
  }

  getGlobal(variableName: string): any {
    return this.global[variableName];
  }

  getGlobal$(variableName: string): Observable<any> {
    console.info(`Get Global ${variableName}:`, this.global[variableName]);
    return of(this.global[variableName]);
  }

  setDim(dimName: string, value: any): any {
    this.dim[dimName] = value;
  }

  getDim(dimName: string): any {
    return this.dim[dimName];
  }

  setFunction(functionName: string, value: any): any {
    this.function[functionName] = value;
  }

  getFunction(functionName: string): any {
    return this.function[functionName];
  }

  setKeyDown(code: number, isDown: boolean): void {
    if (isDown) {
      this.keyDown[code] = isDown;
    } else {
      if (this.keyDown.hasOwnProperty(code)) {
        delete this.keyDown[code];
      }
    }
  }

  setKeyAsciiCode(code: number): void {
    this.keyAscii = code;
  }

  getKeyAsciiCode(): number {
    return this.keyAscii;
  }

  incrementKeyHit(code: number): void {
    if (this.keyHit[code]) {
      this.keyHit[code]++;
    } else {
      this.keyHit[code] = 1;
    }
  }

  getKeyHits(code: number): number {
    if (this.keyHit.hasOwnProperty(code)) {
      return this.keyHit[code];
    } else {
      return 0;
    }
  }

  isKeyDown(code: number): boolean {
    return this.keyDown[code];
  }

  flushKeys(): void {
    this.keyDown = {};
    this.keyHit = {};
  }

  setMouseDown(code: number, isDown: boolean): void {
    if (isDown) {
      this.mouseDown[code] = isDown;
    } else {
      if (this.mouseDown.hasOwnProperty(code)) {
        delete this.mouseDown[code];
      }
    }
  }

  incrementMouseHit(code: number): void {
    if (this.mouseHit[code]) {
      this.mouseHit[code]++;
    } else {
      this.mouseHit[code] = 1;
    }
  }

  getMouseHits(code: number): number {
    if (this.mouseHit.hasOwnProperty(code)) {
      return this.mouseHit[code];
    } else {
      return 0;
    }
  }

  isMouseDown(code: number): boolean {
    return this.mouseDown[code];
  }

  flushMouse() {
    this.mouseDown = {};
    this.mouseHit = {};
  }

  setAppTitle(title: string): void {
    this.app.title = title;
  }

  setAntiAliasing(enabled: boolean): void {
    //TODO re-initialize BabylonJS engine to apply the new settings
    this.app.antiAliasing = enabled;
  }

  setWireFrame(enabled: boolean): void {
    this.app.wireFrame = enabled;
  }
}
