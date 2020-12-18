import { CodeBlock } from './code/code-block';

export interface AbstractSyntax {
  globals: object; // TODO: remove?
  codeBlocks: CodeBlock[];
  mainLoop: CodeBlock[];
  functions: any[];
  types: object;
  // TODO: data blocks
}
