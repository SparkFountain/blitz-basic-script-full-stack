import { CodeBlock } from '../../interfaces/code/code-block';

export class WhileWend {
  condition: any;
  statements: CodeBlock[];

  constructor(condition: any, statements: CodeBlock[]) {
    this.condition = condition;
    this.statements = statements;
  }
}
