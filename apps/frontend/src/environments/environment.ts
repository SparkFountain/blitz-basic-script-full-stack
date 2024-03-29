// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiServer: 'http://localhost:3333/api',
  // apiServer: 'https://api.blitzbasicscript.com',

  // TODO: this should not be part of the environment file!
  emailRegex: new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/),
  usernameRegex: new RegExp(/^[a-zA-Z0-9 ]*$/),
  generalNameRegex: new RegExp(/^[a-zA-ZäöüÄÖÜß0-9 ]*$/),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
