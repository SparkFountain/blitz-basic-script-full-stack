import { CommandStatement } from '../classes/command-statement';
import { VariableExpression } from '../classes/expressions/variable-expression';
import { ArithmeticExpression } from '../classes/expressions/arithmetic-expression';
import { LogicalExpression } from '../classes/expressions/logical-expression';

export type Expression =
  CommandStatement
  | ArithmeticExpression
  | LogicalExpression
  | VariableExpression
  | any;
