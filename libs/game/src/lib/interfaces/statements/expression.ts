import { Statement } from './statement';
import { Term } from '../term';
import { Operand } from 'bbscript/src/types/operand';

export interface ExpressionStatement extends Statement {
  terms: Term[],
  operands: Operand[];
}
