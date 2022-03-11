import { NgModule } from '@angular/core';
import { ScriptInjectorService } from './script-injector.service';


@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class UpscaleExtensionModule {

  constructor(
    private scriptInjectionService: ScriptInjectorService
  ) {

  }
}
