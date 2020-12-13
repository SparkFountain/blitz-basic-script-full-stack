import { NumericExpression } from '../classes/expressions/numerical-expression';
import { BooleanExpression } from '../classes/expressions/boolean-expression';
import { StringExpression } from '../classes/expressions/string-expression';
import { CommandStatement } from '../classes/command-statement';
import { ArithmeticExpression } from '../classes/expressions/arithmetic-expression';

export type Term =
  | NumericExpression
  | BooleanExpression
  | StringExpression
  | CommandStatement
  | ArithmeticExpression
  | BooleanExpression;
