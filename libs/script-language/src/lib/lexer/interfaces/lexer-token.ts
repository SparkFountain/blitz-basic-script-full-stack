import { LexerTokenCategory } from '../enums/lexer-token-category';

export interface LexerToken {
  which: LexerTokenCategory;
  value: string | number | boolean | null;
  offset: { x: number; y: number };
}
