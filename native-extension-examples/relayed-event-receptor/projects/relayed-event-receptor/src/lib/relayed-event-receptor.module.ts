import { NgModule } from '@angular/core';
import { RegistrationService } from '@upscale/web-storefront-sdk';

import { RelayedEventReceptorComponent } from './relayed-event-receptor.component';
import { RelayedEventReceptorService } from './relayed-event-receptor.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})

export class UpscaleExtensionModule {

  constructor(
    private registrationServices: RegistrationService,

    // eagerly load listener service
    private receptorService: RelayedEventReceptorService
  ) {
     //register component
    this.registrationServices.register(
      "relay-event-receptor",
      RelayedEventReceptorComponent
    )
  }
 }
