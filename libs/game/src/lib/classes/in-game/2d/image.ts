import { BbScriptBuffer } from './buffer';

export class BbScriptImage {
  private _buffer: BbScriptBuffer;
  private _width: number;
  private _height: number;
  private _name: string;
  private _elements: HTMLImageElement[];
  private _handle: {
    x: number;
    y: number;
  };
  private _rotation: number;

  constructor(
    width: number,
    height: number,
    name: string,
    elements: HTMLImageElement[],
    handle: {
      x: number;
      y: number;
    }
  ) {
    this._buffer = new BbScriptBuffer(document.createElement('canvas'));
    this._width = width;
    this._height = height;
    this._name = name;
    this._elements = elements;
    this._handle = handle;
    this._rotation = 0;
  }

  get buffer(): BbScriptBuffer {
    return this._buffer;
  }

  get width(): number {
    return this._width;
  }
  set width(width: number) {
    this._width = width;
  }

  get height(): number {
    return this._height;
  }
  set height(height: number) {
    this._height = height;
  }

  get name(): string {
    return this._name;
  }

  getElement(frame: number): HTMLImageElement {
    if (frame > this._elements.length - 1) {
      console.error(`[GET IMAGE ELEMENT] Invalid frame ${frame}, image has only ${this._elements.length} frames`);
      frame = 0;
    }

    return this._elements[frame];
  }

  get elements(): HTMLImageElement[] {
    return this._elements;
  }

  get handle(): { x: number; y: number } {
    return this._handle;
  }
  set handle(handle: { x: number; y: number }) {
    this._handle = handle;
  }

  get rotation(): number {
    return this._rotation;
  }
  set rotation(angle: number) {
    this._rotation = angle;
  }
}
