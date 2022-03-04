# Site Access Guard Native Extension

![Employee only screenshot](../../../../../../../documentation/assets/employee-store-blocker.png) 

## What is it?
This Native Extension is designed to block access to a store based on a user's data (customer vs employee) which is saved as an Attribute Set.

## Video demo

https://test-leeann.s3.amazonaws.com/Screen+Recording+2021-08-20+at+3.20.07+PM.mov

## Setting up the Native Extension
Follow the steps below to create your own version of the Site Access Guard Native Extension:

1. Create a Customer Attribute Set

![Customer Attribute Set](../../../../../../../documentation/assets/customer-attribute-set.png) 

2. Download

Download this repository as a zip file and extract it.

3. Configure mapping

Navigate to site-access-guard/projects/site-access-guard/src/lib/site-access-guard.service.ts and replace the Attribute codes with the codes generated in step 1.

4. Component mapping

Open site-access-guard.module.ts.

Take note of the following code starting on line 27:

    ```
    this.registrationServices.register(
      "site-access-guard-component",
      SiteAccessGuardComponent
    )
    ```
    
This code is mapping the SiteAccessGuardComponent component class to the string "site-access-guard-component". The registrationService is a service which is shared between the PWA and the custom component, and essentially by providing this mapping, we are telling the PWA that this component exists

5. Publish Component Library

Open the site-access-guard-guard folder in terminal and execute commands to install all dependencies, build, and package the application. For the current release, neither upscale-web-storefront-sdk nor caas-service-client-angular will be available publicly. For now, they will be bundled together with the PWA app. Download a new PWA app from Workbench, and there will be a "libs" folder containing the .tgz files you'll need to install. 

Copy "libs" from the PWA to the root of custom-component-samples

The exact commands are as follows:

    npm install
    ng build site-access-guard
    npm pack ./dist/site-access-guard 
    
   
Host the generated tarball (.tgz) for the component library in a public environment such as NPM, GitHub, or S3. (Default tarball would be named "site-access-guard-0.0.1.tgz")

6. Create Native Extension

Add the library as a Native Extension within the workbench, similarly to how you would a style extension.
![create native extension](../../../../../../../documentation/assets/Create_Native_Extension.png) 

7. Assign Native Extension

In order to add the library to an app where you wish to use the site access guard, select the extension name in the selectize field for extensions within the app configuration.
![assign native extension](../../../../../../../documentation/assets/Assign_native_extension.png) 

Note: You'll need to download the app to actually see the changes.

8. Configure Experience

Navigate to the experience editor for the experience associated with the app. Add a custom component to Account

In the custom component configuration, enter the extension ID and a component identifier "site-access-guard-component". Hit save. 

![configure experience](../../../../../../../documentation/assets/configure_experience.png) 


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
    import { UpscaleExtensionModule } from 'site-access-guard';

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
