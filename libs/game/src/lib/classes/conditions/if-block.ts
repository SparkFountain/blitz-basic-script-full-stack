import { LogicalExpression, CodeBlock } from '@blitz-basic-script/script-language';

export class IfBlock {
  public conditions: LogicalExpression[]; // this array contains all If / ElseIf conditions
  public statementBlocks: Array<CodeBlock[]>; // each array contains the code blocks for the associated conditional block

  constructor(
    conditions: LogicalExpression[],
    statementBlocks: Array<CodeBlock[]>
  ) {
    this.conditions = conditions;
    this.statementBlocks = statementBlocks;
  }
}
