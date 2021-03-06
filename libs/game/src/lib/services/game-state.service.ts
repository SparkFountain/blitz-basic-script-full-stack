import { Injectable } from '@angular/core';
import { BbScriptImage } from '../classes/in-game/2d/image';
import { BbScriptScreenProperties } from '../interfaces/game/state/screen';
import { ImagesProperties } from '../interfaces/game/state/image';
import { BbScriptFileSystem } from '../interfaces/game/state/file-system';
import { TextModeProperties } from '../interfaces/game/state/text-mode';
import { AppProperties } from '../interfaces/game/state/app';

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

  private _screen: BbScriptScreenProperties;
  private _fileSystem: BbScriptFileSystem;
  private images: ImagesProperties;
  private textMode: TextModeProperties;

  private app: AppProperties;

  private initialTimeStamp: Date;

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

    this.initialTimeStamp = new Date();

    this.app = {
      title: '',
      antiAliasing: true,
      wireFrame: false
    };

    this._screen = {
      width: 1366,
      height: 768,
      origin: {
        x: 0,
        y: 0
      },
      color: {
        red: 255,
        green: 255,
        blue: 255
      },
      clsColor: {
        red: 0,
        green: 0,
        blue: 0
      },
      viewport: {
        beginX: 0,
        beginY: 0,
        width: 400,
        height: 300
      },
      buffer: null
    };

    this.images = {
      autoMidHandle: false
    };

    this.textMode = {
      offset: { x: 0, y: 0 }
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

  public getAllImages(): BbScriptImage[] {
    let result: BbScriptImage[] = [];

    Object.values(this.global).forEach((e: any) => {
      if (e instanceof BbScriptImage) {
        result.push(e);
      }
    });

    return result;
  }

  public getMilliSecs(): number {
    return new Date().getTime() - this.initialTimeStamp.getMilliseconds();
  }

  public get screen(): BbScriptScreenProperties {
    return this._screen;
  }

  public setScreenWidth(width: number): void {
    this._screen.width = width;
  }

  public setScreenHeight(height: number): void {
    this._screen.height = height;
  }

  public setScreenOrigin(origin: { x: number; y: number }): void {
    this._screen.origin = origin;
  }

  public setScreenColor(color: { red: number; green: number; blue: number }): void {
    this._screen.color = color;
  }

  public setScreenClsColor(clsColor: { red: number; green: number; blue: number }): void {
    this._screen.clsColor = clsColor;
  }

  public setScreenViewport(viewport: { beginX: number; beginY: number; width: number; height: number }): void {
    this._screen.viewport = viewport;
  }

  public getImagesProperties(): ImagesProperties {
    return this.images;
  }

  public setImagesAutoMidHandle(active: boolean): void {
    this.images.autoMidHandle = active;

    // update all existing images
    this.getAllImages().forEach((image: BbScriptImage) => {
      if (active) {
        image.handle = { x: image.width / 2, y: image.height / 2 };
      } else {
        image.handle = { x: 0, y: 0 };
      }
    });
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

  setGlobal(id: string, value: any): any {
    console.info('Set Global:', id, value);
    this.global[id] = value;
  }

  getGlobal(id: string): any {
    return this.global[id];
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
    // TODO: re-initialize BabylonJS engine to apply the new settings
    this.app.antiAliasing = enabled;
  }

  setWireFrame(enabled: boolean): void {
    this.app.wireFrame = enabled;
  }

  // FILE SYSTEM
  public get fileSystem(): BbScriptFileSystem {
    return this._fileSystem;
  }

  changeDirectory(path: string): void {
    this._fileSystem.currentDirectory = path;
  }
}
