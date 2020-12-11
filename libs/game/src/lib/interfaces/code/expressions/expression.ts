import {Observable} from 'rxjs';

export interface Expression {
    operation?: any;
    value?: Observable<any>;
    left?: Expression;
    right?: Expression;
}
