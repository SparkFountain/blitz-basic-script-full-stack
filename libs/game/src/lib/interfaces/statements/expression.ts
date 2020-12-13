import { Statement } from './statement';
import { Term } from '../term';
import { Operand } from '../../types/operand';

export interface ExpressionStatement extends Statement {
  terms: Term[],
  operands: Operand[];
}
