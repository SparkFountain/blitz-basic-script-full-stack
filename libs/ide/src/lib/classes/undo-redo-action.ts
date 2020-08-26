export class UndoRedoAction {
  // define range of code difference
  private _caret: {
    begin: {
      x: number;
      y: number;
    };
    end: {
      x: number;
      y: number;
    };
  };
  private _content: string[];

  constructor() {}

  get caret(): {
    begin: {
      x: number;
      y: number;
    };
    end: {
      x: number;
      y: number;
    };
  } {
    return this._caret;
  }

  get content(): string[] {
    return this._content;
  }
}
