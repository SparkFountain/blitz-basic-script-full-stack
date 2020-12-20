import { CodeBlock, LogicalExpression } from '@blitz-basic-script/script-language';

export class WhileLoop {
  public condition: LogicalExpression;
  public statements: CodeBlock[];

  constructor(condition: LogicalExpression, statements: CodeBlock[]) {
    this.condition = condition;
    this.statements = statements;
  }
}
