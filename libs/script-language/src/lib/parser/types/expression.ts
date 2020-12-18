import { CommandStatement } from '../classes/command-statement';
import { VariableExpression } from '../classes/expressions/variable-expression';

export type Expression = CommandStatement | VariableExpression | any;
