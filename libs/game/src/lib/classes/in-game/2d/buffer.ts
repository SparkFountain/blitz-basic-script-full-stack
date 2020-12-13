export class BbScriptBuffer {
  private _canvas: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _dirty: boolean;

  constructor(canvas: HTMLCanvasElement) {
    console.info('[CANVAS]', canvas);

    this._canvas = canvas;
    this._context = canvas.getContext('2d');
    this._dirty = false;
  }

  get context(): CanvasRenderingContext2D {
    return this._context;
  }

  get dirty(): boolean {
    return this._dirty;
  }
  set dirty(value: boolean) {
    this._dirty = value;
  }
}
