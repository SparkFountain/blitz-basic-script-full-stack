import {Observable} from 'rxjs';

export interface RepeatUntil {
    condition: Observable<any>[];
    statements: Observable<any>[];
}
