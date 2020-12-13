import { CodeBlock } from '../../interfaces/code/block';

export class SelectBlock {
  public expression: string;
  public cases: any[];
  public statementBlocks: Array<CodeBlock[]>; // each array contains the code blocks for the associated conditional block

  constructor(
    expression: string,
    cases: any[],
    statementBlocks: Array<CodeBlock[]>
  ) {
    this.expression = expression;
    this.cases = cases;
    this.statementBlocks = statementBlocks;
  }
}
