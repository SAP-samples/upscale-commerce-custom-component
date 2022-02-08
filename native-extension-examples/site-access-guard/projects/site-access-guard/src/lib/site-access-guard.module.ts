import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegistrationService } from '@upscale/web-storefront-sdk';
import { SiteAccessGuardComponent } from './site-access-guard.component';
import { SiteAccessGuardService } from './site-access-guard.service';

@NgModule({
  declarations: [
    SiteAccessGuardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SiteAccessGuardComponent
  ]
})
export class UpscaleExtensionModule {

  constructor(
    private registrationServices: RegistrationService,

    // eagerly loaded custom service
    private siteAccessGuardService: SiteAccessGuardService
  ) {
     //register component
    this.registrationServices.register(
      "site-guard-component",
      SiteAccessGuardComponent
    )
  }
 }
