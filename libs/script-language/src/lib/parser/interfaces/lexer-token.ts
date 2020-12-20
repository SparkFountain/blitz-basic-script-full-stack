import { LexerTokenCategory } from '@blitz-basic-script/script-language';

export interface LexerToken {
    which: LexerTokenCategory;
    value: string | number | boolean | null;
    offset: { x: number, y: number };
}
