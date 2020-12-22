export class ParserError {
  message: string;
  line: number;
  offset: number;

  constructor(message: string, line: number, offset: number) {
    this.message = message;
    this.line = line;
    this.offset = offset;
  }
}
