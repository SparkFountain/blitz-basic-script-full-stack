export class BbScriptStream {
  private _read: boolean;
  private _write: boolean;

  private _content: ArrayBuffer;
  private _position: number;

  constructor(content: string, read: boolean, write: boolean) {
    this.read = read;
    this.write = write;

    const enc = new TextEncoder(); // always utf-8
    this._content = enc.encode(content);

    this._position = 0;
  }

  get read(): boolean {
    return this._read;
  }
  set read(value: boolean) {
    this._read = value;
  }

  get write(): boolean {
    return this._write;
  }
  set write(value: boolean) {
    this._write = value;
  }

  get content(): ArrayBuffer {
    return this._content;
  }
  set content(content: ArrayBuffer) {
    this._content = content;
  }

  get position(): number {
    return this._position;
  }
  set position(value: number) {
    this._position = value;
  }
}
