import { Expression } from '../types/expression';
import { AssignmentScope } from '../types/assignment-scope';

export class Assignment {
  scope: AssignmentScope;
  id: string;
  value: Expression;

  constructor(scope: AssignmentScope, id: string, value: Expression) {
    this.scope = scope;
    this.id = id;
    this.value = value;
  }
}
