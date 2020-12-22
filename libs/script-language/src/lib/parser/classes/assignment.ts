import { AssignmentScope } from '../types/assignment-scope';

export class Assignment {
  scope: AssignmentScope;
  id: string;
  value?: any;

  constructor(scope: AssignmentScope, id: string, value?: any) {
    this.scope = scope;
    this.id = id;
    this.value = value ?? undefined;
  }
}
