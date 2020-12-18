import {Observable} from 'rxjs';

export interface WhileWend {
    condition: Observable<any>[];
    statements: Observable<any>[];
}
