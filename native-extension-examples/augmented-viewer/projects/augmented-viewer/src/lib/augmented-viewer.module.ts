import { NgModule } from '@angular/core';
import { RegistrationService } from '@upscale/web-storefront-sdk';
import { AugmentedViewerComponent } from './augmented-viewer.component';


@NgModule({
  declarations: [
    AugmentedViewerComponent
  ],
  imports: [],
  exports: [
    AugmentedViewerComponent
  ]
})
export class UpscaleExtensionModule {
  constructor(
    registrationService: RegistrationService
  ) {
    registrationService.register('augmented-viewer-component', AugmentedViewerComponent);
  }
}
