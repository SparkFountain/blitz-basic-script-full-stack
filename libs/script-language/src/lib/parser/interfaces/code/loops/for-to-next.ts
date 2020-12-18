import {Assignment} from '../assignment';
import {Observable} from 'rxjs';

export interface ForToNext {
    assignment: Assignment;
    limit: number;
    increment: number;
    statements: Observable<any>[];
}
