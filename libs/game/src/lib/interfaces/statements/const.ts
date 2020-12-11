import { Statement } from './statement';


export interface ConstStatement extends Statement {
  name: string;
  value: number | string | boolean | null;
}
