import { CodeBlock } from '@blitz-basic-script/script-language';
import { Assignment } from '../assignment';

export class ForToNext {
  assignment: Assignment;
  limit: number;
  increment: number;
  statements: CodeBlock[];

  constructor(
    assignment: Assignment,
    limit: number,
    increment: number,
    statements: CodeBlock[]
  ) {
    this.assignment = assignment;
    this.limit = limit;
    this.increment = increment;
    this.statements = statements;
  }
}
