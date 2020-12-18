import { Expression } from '../../types/expression';

export interface Assignment {
    variable: string;
    type: AssignmentType;
    expression: Expression;
}

type AssignmentType = 'const' | 'global' | 'local' | 'dim'; //TODO continue
