import { Assignment } from '../../classes/assignment';
import { IfThenElse } from './conditions/if-then-else';
import { SelectCase } from './conditions/select-case';
import { ForToNext } from './loops/for-to-next';
import { WhileWend } from './loops/while-wend';
import { RepeatUntil } from './loops/repeat-until';
import { Include } from './include';
import { DataBlock } from './data-block';
import { Statement } from '../../types/statement';

export type CodeBlock = Assignment | Statement | IfThenElse | SelectCase | ForToNext | WhileWend | RepeatUntil | Include | DataBlock;
