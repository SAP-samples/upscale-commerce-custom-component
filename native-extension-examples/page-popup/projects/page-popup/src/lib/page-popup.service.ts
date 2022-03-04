import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { filter } from "rxjs/operators";

import { DialogContentsComponent } from './dialog-contents/dialog-contents.component';

@Injectable({
  providedIn: 'root'
})
export class PagePopupService {

  modalTitle = "Title";
  modalText = "Your message body here";
  modalCancel = "Cancel";
  modalConfirm = "OK";

  constructor(
    public dialog: MatDialog,
    private router: Router,
  ) {
    this.router.events.pipe(
      filter(ev => ev instanceof NavigationStart)
    ).subscribe((ev: any) => {
      if(ev.url.includes('cart')) {
        this.openModal();
      }
    })
  }

  openModal() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: 1,
      title: this.modalTitle,
      text: this.modalText,
      cancel: this.modalCancel,
      confirm: this.modalConfirm,
    };

    const dialogRef = this.dialog.open(DialogContentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log("Dialog was closed")
      console.log(result)
    });
  }
}
