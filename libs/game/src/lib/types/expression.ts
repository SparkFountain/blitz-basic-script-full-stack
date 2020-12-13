import { BooleanExpression } from '../classes/expressions/boolean-expression';
import { StringExpression } from '../classes/expressions/string-expression';
import { NumericExpression } from '../classes/expressions/numerical-expression';
import { CommandStatement } from '../classes/command-statement';
import { VariableExpression } from '../classes/expressions/variable-expression';
import { ArithmeticExpression } from '../classes/expressions/arithmetic-expression';
import { LogicalExpression } from '../classes/expressions/logical-expression';

export type Expression =
  | NumericExpression
  | BooleanExpression
  | StringExpression
  | CommandStatement
  | ArithmeticExpression
  | LogicalExpression
  | VariableExpression;
