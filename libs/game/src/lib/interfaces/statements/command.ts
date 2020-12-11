import { Statement } from './statement';

export interface CommandStatement extends Statement {
  name: string;
  params: any;  // TODO: specify
}
