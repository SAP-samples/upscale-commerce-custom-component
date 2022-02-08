import { NgModule } from '@angular/core';
import { RelayedEventReceptorService } from './relayed-event-receptor.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})

export class UpscaleExtensionModule {

  constructor(
    // eagerly load listener service
    private receptorService: RelayedEventReceptorService
  ) {

  }
 }
