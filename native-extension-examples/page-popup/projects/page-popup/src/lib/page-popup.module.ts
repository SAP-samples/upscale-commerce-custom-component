import { NgModule } from '@angular/core';
import { PagePopupComponent } from './page-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogContentsComponent } from './dialog-contents/dialog-contents.component';
import { PagePopupService } from './page-popup.service';


@NgModule({
  declarations: [
    PagePopupComponent,
    DialogContentsComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    PagePopupComponent
  ]
})
export class UpscaleExtensionModule {

  constructor(
    private popupService: PagePopupService
  ) {

  }
 }
