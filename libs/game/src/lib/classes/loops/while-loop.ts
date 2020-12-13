import { CodeBlock } from '../../interfaces/code/block';
import { LogicalExpression } from '../expressions/logical-expression';

export class WhileLoop {
  public condition: LogicalExpression;
  public statements: CodeBlock[];

  constructor(condition: LogicalExpression, statements: CodeBlock[]) {
    this.condition = condition;
    this.statements = statements;
  }
}
