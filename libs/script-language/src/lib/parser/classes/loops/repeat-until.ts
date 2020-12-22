import { CodeBlock } from '@blitz-basic-script/script-language';

export class RepeatUntil {
  condition: any;
  statements: CodeBlock[];

  constructor(condition: any, statements: CodeBlock[]) {
    this.condition = condition;
    this.statements = statements;
  }
}
