import {Observable} from 'rxjs';

export interface Function {
    name: string;
    params: Parameter[];
    statements: Observable<any>[];
}

type Parameter = {
    name: string;
    defaultValue?: any;
};
