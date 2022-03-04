# Page Popup Native Extension

## What is it?
This Native Extension makes use of the angular material library to render a stylized dialog over the screen when the user navigates to the cart page. It can easily be adjusted to appear on any other page, and the same dialogs can be used to build more professional UI for native extension components. 

## Setting up the Native Extension
Follow the steps below to create your own version of the Page Popup Native Extension:

Note: Since this extension only contains a service, no component mapping is required.

1. Download

Download this repository as a zip file and extract it.

2. Modify dialog behavior and contents

Open page-popup/projects/page-popup/src/lib/page-popup.service.ts. 

Note that all text shown in the dialog is determined by the the dialogConfig object instantiated on line 33. These strings may be changed to anything you wish. On line 46, you may also choose specific behavior for the dialog on close, and this can differ based on the button that is clicked. On line 26, navigation events are used to determine when to show the dialog. If you wish to change the route trigger, please refer to the PWA app for a list of route names in the following PWA file: src/app/app-routing/template-routes.const.ts.

3. Publish Component Library

Open the page-popup folder in terminal and execute commands to install all dependencies, build, and package the application. For the current release, neither upscale-web-storefront-sdk nor caas-service-client-angular will be available publicly. For now, they will be bundled together with the PWA app. Download a new PWA app from Workbench, and there will be a "libs" folder containing the .tgz files you'll need to install. 

Copy "libs" from the PWA to the root of custom-component-samples

The exact commands are as follows:

    npm install
    ng build page-popup
    npm pack ./dist/page-popup 
    
   
Host the generated tarball (.tgz) for the component library in a public environment such as NPM, GitHub, or S3. (Default tarball would be named "page-popup-0.0.1.tgz")

4. Create Native Extension

Add the library as a Native Extension within the workbench, similarly to how you would a style extension.
![create native extension](../../../../../../../documentation/assets/Create_Native_Extension.png) 

5. Assign Native Extension

In order to add the library to an app where you wish to use the Page Popup, select the extension name in the selectize field for extensions within the app configuration.
![assign native extension](../../../../../../../documentation/assets/Assign_native_extension.png) 

Note: You'll need to download the app to actually see the changes.


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
    import { UpscaleExtensionModule } from 'page-popup';

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
