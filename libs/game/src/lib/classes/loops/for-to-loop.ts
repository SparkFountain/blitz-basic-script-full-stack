import { CodeBlock } from '@blitz-basic-script/script-language';

export class ForToLoop {
  public id: string;
  public from: number;
  public to: number;
  public step: number;
  public statements: CodeBlock[];

  constructor(
    id: string,
    from: number,
    to: number,
    step: number,
    statements: CodeBlock[]
  ) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.step = step;
    this.statements = statements;
  }
}
