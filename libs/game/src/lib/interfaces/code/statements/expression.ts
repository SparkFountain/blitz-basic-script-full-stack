import { Operand } from '../../../types/operand';
import { Term } from '../../term';

export interface ExpressionStatement {
  terms: Term[];
  operands: Operand[];
}
