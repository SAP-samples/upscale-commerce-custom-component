// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
  storeOrigin:  'https://your-store.com',
	googleApiKey: '<your-google-api-key>',
	intermediaryApiKey: '<your-external-application-api-key>',
	intermediaryApiRoot: 'https://<your-external-application>.com',
	showInventoryMap: true // false - show shop locations, true - show inventory per shop location for current product viewed
};
