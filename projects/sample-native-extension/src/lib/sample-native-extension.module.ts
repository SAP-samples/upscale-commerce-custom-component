import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegistrationService } from '@upscale/web-storefront-sdk';
import { EmployeeOnlyStoreGuardService, EmployeeOnlyStoreGuardComponent } from './employee-only-store-guard';
import { KlarnaCheckoutComponent } from './klarna-checkout';

const components = [
  EmployeeOnlyStoreGuardComponent,
  KlarnaCheckoutComponent
]


@NgModule({
  declarations: [...components],
  imports: [ CommonModule ],
  exports: [...components]
})
export class UpscaleExtensionModule {

  constructor(
    private registrationServices: RegistrationService,
    // eagerly load service
    private employeeService: EmployeeOnlyStoreGuardService
  ) {
     //register components
    this.registrationServices.register(
      "klarna-checkout-component",
      KlarnaCheckoutComponent
    );

    this.registrationServices.register(
      "employee-only-store-component",
      EmployeeOnlyStoreGuardComponent
    )
  }

}
