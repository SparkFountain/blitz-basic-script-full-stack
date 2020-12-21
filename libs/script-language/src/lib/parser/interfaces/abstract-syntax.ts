import { Function } from '../classes/function';
import { Type } from '../classes/type';
import { CodeBlock } from './code/code-block';

export interface AbstractSyntax {
  codeBlocks: CodeBlock[];
  mainLoop: CodeBlock[];
  functions: Function[];
  types: Type[];
  // TODO: data blocks
}
