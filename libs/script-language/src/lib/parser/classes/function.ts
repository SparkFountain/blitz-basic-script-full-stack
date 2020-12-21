import { CodeBlock } from '@blitz-basic-script/script-language';

export class Function {
  name: string;
  params: Parameter[];
  statements: CodeBlock[];

  constructor(name: string, params: Parameter[], statements: CodeBlock[]) {
    this.name = name;
    this.params = params;
    this.statements = statements;
  }
}

export type Parameter = {
  name: string;
  defaultValue?: any;
};
