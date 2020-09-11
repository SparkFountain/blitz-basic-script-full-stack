import { Injectable } from '@angular/core';
import { GameService } from '../game.service';


// TODO: replace / remove / do whatever with these classes / interfaces / whatever :)
export type Assignment = any;
export type CommandStatement = any;
export type WhileLoop = any;
export type Expression = any;
export type NumericExpression = any;
export type BooleanExpression = any;
export type StringExpression = any;
export type VariableExpression = any;
export type ArithmeticExpression = any;
export type Term = any;
export type LogicalExpression = any;
export type IfBlock = any;
export type SelectBlock = any;
export type ForToLoop = any;
export type RepeatLoop = any;

@Injectable({
  providedIn: 'root',
})
export class InterpreterService {
  private abstractSyntax: any;
  private codeBlockIndex: number;

  constructor(private gameService: GameService) {
    this.codeBlockIndex = 0;
  }

  public initialize(abstractSyntax: any): void {
    this.abstractSyntax = abstractSyntax;
    console.info('Abstract Syntax:', abstractSyntax);
  }

  public async run(): Promise<void> {
    for (let i = 0; i < this.abstractSyntax.codeBlocks.length; i++) {
      await this.interprete(this.abstractSyntax.codeBlocks[i]);
    }
  }

  public async interprete(codeBlock: any): Promise<void> {
    console.info('Interpreting Code Block', codeBlock);

    switch (codeBlock.constructor.name) {
      case 'Assignment':
        await this.assign(codeBlock as Assignment);
        break;
      case 'CommandStatement':
        await this.executeCommand(codeBlock as CommandStatement);
        break;
      case 'ConstStatement':
        break;
      case 'ExpressionStatement':
        break;
      case 'IfThenElse':
        break;
      case 'SelectCase':
        break;
      case 'ForToNext':
        break;
      case 'WhileWend':
        this.whileLoop(codeBlock as WhileLoop);
        break;
      case 'RepeatUntil':
        break;
      case 'Include':
        break;
      case 'Include':
        break;
      case 'DataBlock':
        break;
    }
  }

  public async executeCommand(command: CommandStatement): Promise<any> {
    // TODO: inform game component somehow that it should execute a command
  }

  public async evaluateExpression(expression: Expression): Promise<any> {
    const termsToEvaluate: Promise<string>[] = [];
    let evaluatedTerms: any[];
    let result = '';
    // console.info('Expression', expression);

    switch (expression.constructor.name) {
      case 'NumericExpression':
        return (expression as NumericExpression).value;
      case 'BooleanExpression':
        return (expression as BooleanExpression).value;
      case 'StringExpression':
        return (expression as StringExpression).value;
      case 'VariableExpression':
        const varExpr: VariableExpression = expression as VariableExpression;
        switch (varExpr.scope) {
          case 'const':
          case 'global':
            return this.gameService.getGlobal(varExpr.id);
        }
      case 'CommandStatement':
        return this.executeCommand(expression as CommandStatement);
      case 'ArithmeticExpression':
        const arithExpr: ArithmeticExpression = expression as ArithmeticExpression;

        arithExpr.terms.forEach((term: Term) =>
          termsToEvaluate.push(this.evaluateExpression(term))
        );
        evaluatedTerms = await Promise.all(termsToEvaluate);

        evaluatedTerms.forEach((term: string, index: number) => {
          result += term;
          if (index < arithExpr.terms.length - 1) {
            result += arithExpr.operators[index];
          }
        });
        return eval(result);
      case 'LogicalExpression':
        const logicExpr: LogicalExpression = expression as LogicalExpression;

        logicExpr.terms.forEach((term: Term) =>
          termsToEvaluate.push(this.evaluateExpression(term))
        );
        evaluatedTerms = await Promise.all(termsToEvaluate);

        evaluatedTerms.forEach((term: string, index: number) => {
          result += term;
          if (index < logicExpr.terms.length - 1) {
            result += logicExpr.operators[index];
          }
        });
        return eval(result);
    }

    console.warn('Expression could not be evaluated:', expression);
    return null;
  }

  public async assign(assignment: Assignment): Promise<void> {
    const evaluatedExpression: any = await this.evaluateExpression(
      assignment.value
    );
    // console.info('evaluatedExpression:', evaluatedExpression);

    switch (assignment.scope) {
      case 'const':
      case 'global':
        this.gameService.setGlobal(assignment.id, evaluatedExpression);
    }
  }

  public async ifBlock(ifBlock: IfBlock): Promise<void> {
    const expressionsToEvaluate: Promise<any>[] = [];
    ifBlock.conditions.forEach((condition: LogicalExpression) =>
      expressionsToEvaluate.push(this.evaluateExpression(condition))
    );
    const evaluatedConditions: any[] = await Promise.all(expressionsToEvaluate);
    // console.info('Evaluated Conditions:', evaluatedConditions);
  }

  public async selectBlock(selectBlock: SelectBlock): Promise<void> {}

  public async forToLoop(forToLoop: ForToLoop): Promise<void> {}

  public async repeatLoop(repeatLoop: RepeatLoop): Promise<void> {}

  public async whileLoop(whileLoop: WhileLoop): Promise<void> {
    this.evaluateExpression(whileLoop.condition).then((condition: boolean) => {
      if (condition === true) {
      } else {
        return null;
      }
    });
  }
}
