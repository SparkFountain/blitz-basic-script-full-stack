import { Observable } from 'rxjs';

export interface AbstractSyntax {
  globals: object;
  statements: any[];
  mainLoop$: Observable<any>[];
  functions$: Observable<any>[];
  types: object;
}
