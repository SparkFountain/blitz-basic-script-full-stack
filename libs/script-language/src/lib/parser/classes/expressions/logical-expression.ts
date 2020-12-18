import { Term } from '../../types/arithmetic-term';
import { LogicalOperator } from '../../types/logical-operator';

export class LogicalExpression {
  public terms: Term[];
  public operators: LogicalOperator[];

  constructor(terms: Term[], operators: LogicalOperator[]) {
    this.terms = terms;
    this.operators = operators;
  }
}
