import { Assignment } from '../../classes/assignment';
import { IfThenElse } from './conditions/if-then-else';
import { SelectCase } from './conditions/select-case';
import { Include } from './include';
import { DataBlock } from './data-block';
import { Statement } from '../../types/statement';
import { ForToNext } from '../../classes/loops/for-to-next';
import { WhileWend } from '../../classes/loops/while-wend';
import { RepeatUntil } from '../../classes/loops/repeat-until';

export type CodeBlock =
  | Assignment
  | Statement
  | IfThenElse
  | SelectCase
  | ForToNext
  | WhileWend
  | RepeatUntil
  | Include
  | DataBlock;
