import { Expression } from '../types/expression';

export class CommandStatement {
  name: string;
  params: Expression[];

  constructor(name: string, params: Expression[]) {
    this.name = name;
    this.params = params;
  }
}
