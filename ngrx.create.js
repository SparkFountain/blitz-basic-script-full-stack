// access file system
const fs = require('fs');

// get command line arguments (1st arg: "node", 2nd argument: script path)
let args = process.argv;
// third argument: name of nrgx entity
let prefix = args[2];
if (prefix === undefined) {
  console.log('\x1b[31m%s\x1b[0m', '\nYou must provide a prefix for your ngrx instance.\n');
  process.exit();
} else if (prefix.length < 2) {
  console.log('\x1b[31m%s\x1b[0m', '\nThe ngrx instance name must have at least two characters.\n');
  process.exit();
}
const prefixUpper = `${prefix[0].toUpperCase()}${prefix.substr(1)}`;
let dir = `./apps/frontend-new/src/app/core/store/${prefix}`;

// check if directory already exists
if (fs.existsSync(dir)) {
  console.log('\x1b[32m%s\x1b[0m', '\nThis ngrx instance already exists.\n');
}

// create directory
fs.mkdir(dir, { recursive: true }, (err) => {
  if (err) { throw err };
});

// create reducer file
const reducerContent = `import { Action, createReducer, on } from '@ngrx/store';
import * as ${prefixUpper}Actions from './${prefix}.actions';

export interface ${prefixUpper}State {
  message: string
}

export const initialState: ${prefixUpper}State = {
  message: 'Hello World!'
};

const ${prefix}Reducer = createReducer(
  initialState,
  on(${prefixUpper}Actions.changeMessage, (state, {message}) => ({ ...state, message }))
);

export function reducer(state: ${prefixUpper}State | undefined, action: Action) {
  return ${prefix}Reducer(state, action);
}`;
fs.writeFileSync(`${dir}/${prefix}.reducer.ts`, reducerContent);

// create actions file
const actionContent = `import { createAction, props } from '@ngrx/store';

const prefix = '[${prefixUpper}]';

export const changeMessage = createAction(
  \`\${prefix} Change Message\`,
  props<{ message: string; }>()
);`;
fs.writeFileSync(`${dir}/${prefix}.actions.ts`, actionContent);

// create selectors file
const selectorsContent = `import { createSelector } from '@ngrx/store';
import { AppState } from '../../../interfaces/app-state.interface';
import { ${prefixUpper}State } from './${prefix}.reducer';

export const select${prefixUpper}Feature = (state: AppState) => state.${prefix};

export const selectMessage = (state: AppState) => state.${prefix}.message;
`;
fs.writeFileSync(`${dir}/${prefix}.selectors.ts`, selectorsContent);

// create effects file
const effectsContent = `import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { AppState } from 'src/app/interfaces/app-state.interface';
import * as ${prefixUpper}Actions from './${prefix}.actions';

@Injectable()
export class ${prefixUpper}Effects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private ${prefix}Service: ${prefixUpper}Service
  ) {}

  getMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(${prefixUpper}Actions.getMessage),
      exhaustMap(() =>
        this.${prefix}Service.getMessage$().pipe(
          map((message: string) =>
            FlightsActions.getMessageSuccess({ message })
          ),
          catchError(() => of(${prefixUpper}Actions.getMessageFailed()))
        )
      )
    )
  );
`;
fs.writeFileSync(`${dir}/${prefix}.effects.ts`, effectsContent);