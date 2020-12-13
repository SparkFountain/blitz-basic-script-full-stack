
import { FunctionParameter } from './function-parameter';
import { CodeBlock } from 'bbscript/src/interfaces/code/block';

export class Function {
  public id: string;
  public params: FunctionParameter[];
  public statements: CodeBlock[];

  constructor(id: string, params: FunctionParameter[], statements: CodeBlock[]) {
    this.id = id;
    this.params = params;
    this.statements = statements;
  }
}
