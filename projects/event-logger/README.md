# Event logger

## Displays all events received from the Upscale Storefront.

## Configure

Replace `storeOrigin` in the environments files.

## Development server

Run `npm start <app-name>` for a dev server (i.e., `npm start store-locator`). Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --project=<app-name>` to build the project (i.e., `ng build --project=<app-name>`). The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Build for CloudFoundry deployment

Run `npm run assemble --project=<app-name>` to build the project (i.e., `npm run assemble --project=store-locator`). The build artifacts will be stored in the `dist/` directory. 

Edit `manifest.yml` with deployment details & add the configured route as an "origin" in the External Application

## How to obtain support

[Create an issue](https://github.com/SAP-samples/<repository-name>/issues) in this repository if you find a bug or have questions about the content.
 
For additional support, [ask a question in SAP Community](https://answers.sap.com/questions/ask.html).

## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
