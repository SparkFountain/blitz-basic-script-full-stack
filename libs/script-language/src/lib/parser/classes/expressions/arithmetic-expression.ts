import { ArithmeticOperator } from '../../types/arithmetic-operator';
import { Term } from '../../types/arithmetic-term';

export class ArithmeticExpression {
  public terms: Term[];
  public operators: ArithmeticOperator[];

  constructor(terms: Term[], operators: ArithmeticOperator[]) {
    this.terms = terms;
    this.operators = operators;
  }
}
