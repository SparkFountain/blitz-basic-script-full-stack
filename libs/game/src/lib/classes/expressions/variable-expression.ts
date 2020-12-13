import { AssignmentScope } from '../../types/assignment-scope';

export class VariableExpression {
  public scope: AssignmentScope;
  public id: string;

  constructor(scope: AssignmentScope, id: string) {
    this.scope = scope;
    this.id = id;
  }
}
