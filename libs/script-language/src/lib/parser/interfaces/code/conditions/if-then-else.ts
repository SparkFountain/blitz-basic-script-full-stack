import {Observable} from 'rxjs';

export interface IfThenElse {
    conditions: ConditionalBlock[];
}

type ConditionalBlock = {
    condition: Observable<any>[]; //must be evaluated to a boolean value
    statements: Observable<any>[];
}
