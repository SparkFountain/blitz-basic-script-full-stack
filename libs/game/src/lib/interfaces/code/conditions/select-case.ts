import {Observable} from 'rxjs';

export interface SelectCase {
    expression: any;
    cases: Case[];
}

type Case = {
    value: any;
    statements: Observable<any>[];
};
