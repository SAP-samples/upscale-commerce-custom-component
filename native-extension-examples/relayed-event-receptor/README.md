# Relayed Event Receptor

## What is it?
This native extension contains a service which intercepts custom component events fired from a relay custom component and publishes them for internal use. The example provided is a simple native extension component which lists all events emitted from the service. By using this service, however, it is possible to build any functionality with a native extension which was previously only possible with a custom component.

## Relay Custom Component Requirements
The relay custom component must receive the custom component events, and then immediately post them to the parent window. Please see the sample hosted on glitch:
https://glitch.com/edit/#!/glass-cream-bird?path=script.js%3A16%3A58

Note that the expectedOrigin should be changed to match the url of the hosted PWA.

Follow the steps on the official Upscale help pages to add the custom component to your app: 
https://help.sap.com/viewer/DRAFT/7a1f60b8170f40cfb8313c49bdc7fd13/DEV/en-US/f542f9dc2d744b28b471ca6f044d832c.html

## Setting up the Native Extension
Follow the steps below to create your own version of the Relayed Event Receptor Native Extension:

1. Download

Download this repository as a zip file and extract it.

2. Component mapping

Open relayed-event-receptor/projects/relayed-event-receptor/src/lib/relayed-event-receptor.module.ts.

Take note of the following code starting on line 22:

    ```
    this.registrationServices.register(
      "relayed-event-receptor-component",
      RelayedEventReceptorComponent
    )
    ```

This code is mapping the RelayedEventReceptorComponent component class to the string "relayed-event-receptor-component". The registrationService is a service which is shared between the PWA and the custom component, and essentially by providing this mapping, we are telling the PWA that this component exists

3. Make use of RelayedEventReceptorService how you see fit

As shown in the sample component provided (relayed-event-receptor/projects/relayed-event-receptor/src/lib/relayed-event-receptor.component.ts), you may subscribe to the RelayedEventReceptorService's customComponentEventStream to receive all events which are emitted by the relay custom component. Please refer to the docs linked above for examples of how the native extension can take advantage of these the events.

4. Publish Component Library

Open the relayed-event-receptor folder in terminal and execute commands to install all dependencies, build, and package the application. For the current release, neither upscale-web-storefront-sdk nor caas-service-client-angular will be available publicly. For now, they will be bundled together with the PWA app. Download a new PWA app from Workbench, and there will be a "libs" folder containing the .tgz files you'll need to install. 

Copy "libs" from the PWA to the root of custom-component-samples

The exact commands are as follows:

    npm install
    ng build relayed-event-receptor
    npm pack ./dist/relayed-event-receptor 
    
   
Host the generated tarball (.tgz) for the component library in a public environment such as NPM, GitHub, or S3. (Default tarball would be named "relayed-event-receptor-0.0.1.tgz")

5. Create Native Extension

Add the library as a Native Extension within the workbench, similarly to how you would a style extension.
![create native extension](../../../../../../../documentation/assets/Create_Native_Extension.png) 

6. Assign Native Extension

In order to add the library to an app where you wish to utilize the relay event receptor native extension, select the extension name in the selectize field for extensions within the app configuration.
![assign native extension](../../../../../../../documentation/assets/Assign_native_extension.png) 

Note: You'll need to download the app to actually see the changes.

7. Configure Experience

Navigate to the experience editor for the experience associated with the app and a custom component to the template where the native extension component should appear.

In the custom component configuration, enter the extension ID and a component identifier corresponding to the mapping done in relayed-event-receptor.module.ts. Hit save.

![configure experience](../../documentation/assets/configure_experience.png)

## Installation & Testing
If all the above setup is complete, please follow the steps below to test your new native extension.

1. Download the app.

2. Extract the contents of the zip.

3. Access the project root in terminal and run "npm install"  
  *NOTE: There is a known issue with NPM 7's handling of peer-deps. If using 7 run "npm install --legacy-peer-deps"* 

4. Add the library module to your application:

    Note: If you're using version 0.59.0 or higher, this step is automated and can be skipped.

    Open the file src/app/core/extension.module.ts in your ide/text editor
    Add the following to the first list of imports:
    
   ``` 
    import { UpscaleExtensionModule } from 'relayed-event-receptor';

    // Add Native Extension Modules here
    const modules = [
      UpscaleExtensionModule
    ];
    ```

5. Access the application via localhost:4200. 
  - Eagerly loaded services from the Native Extension should be running. 
  - Components registered in the Native Extension, and configured to your Experience, should be visible.


## License
Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
