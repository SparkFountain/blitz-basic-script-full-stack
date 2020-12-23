import { AssignmentScope } from '../types/assignment-scope';
import { Expression } from '../types/expression';

export class Assignment {
  scope: AssignmentScope;
  id: string;
  value?: Expression | string | number | boolean | null;

  constructor(scope: AssignmentScope, id: string, value?: any) {
    this.scope = scope;
    this.id = id;
    this.value = value ?? undefined;
  }
}
