# SAP Upscale Commerce - Custom Components

[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/upscale-commerce-custom-component)](https://api.reuse.software/info/github.com/SAP-samples/upscale-commerce-custom-component)

## Custom Component samples for SAP Upscale Commerce.

Custom Components are used to add customized UI elements to applications generated in SAP Upscale Commerce. The samples referenced here are real-world use cases and use both Iframe and Native based Custom Components. [General documentation](https://help.sap.com/viewer/0160c41e0de84b218d05bc1185213d1d/LATEST/en-US/f542f9dc2d744b28b471ca6f044d832c.html)

## Samples

1) Store Locator: Displays a Google Map with all Fulfillment Stores in your Upscale tenant. It can be configured to display inventory per product per store.

    [Read more on the UI](projects/store-locator/README.md)

    [Read more on back-end support](https://github.com/SAP-samples/upscale-commerce-external-application/tree/sample/store-locator-inventory-intermediary)
2) Event Logger: Displays all known events received by the Custom Component from the SAP Upscale Store. 

    [Read more](projects/event-logger/README.md)
3) Sample Native Extension with the following examples:
    - Klarna Checkout Component
    - Employee Only Service
    - JavaScript Injection Service
    
    [Read more on Native Extensions](projects/sample-native-extension/README.md)

## Requirements

To embed these components one would need access to an SAP Upscale Commerce tenant & the ability to host Angular Applications.

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
