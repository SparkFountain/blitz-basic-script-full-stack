import {Expression} from './expression';

export interface StringExpression extends Expression {
    operations: StringExpOp[];
}

export type StringExpOp = '+'; //TODO more?
