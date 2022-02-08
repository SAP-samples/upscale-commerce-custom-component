import { AlgoliaProductListingComponent } from './algolia-product-listing.component';
import { NgModule } from '@angular/core';
import { NgAisModule } from 'angular-instantsearch';
import { RegistrationService } from '@upscale/web-storefront-sdk';
import { BrowserModule } from '@angular/platform-browser'

@NgModule({
  declarations: [
    AlgoliaProductListingComponent
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule
  ],
  exports: [
    AlgoliaProductListingComponent
  ]
})
export class UpscaleExtensionModule {

  constructor(
    // service instance also used by Upscale PWA
    private registrationService: RegistrationService
  ) {
    // register component to make available for rendering in experience
    this.registrationService.register(
      'algolia-search',
      AlgoliaProductListingComponent
    );
  }
}
