import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-dialog-contents',
  templateUrl: './dialog-contents.component.html',
  styleUrls: ['./dialog-contents.component.css']
})
export class DialogContentsComponent {

  modalTitle: string;
  modalText: string;
  modalConfirm: string;
  modalCancel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modalTitle = data.title;
    this.modalText = data.text;
    this.modalCancel = data.cancel;
    this.modalConfirm = data.confirm;
    window.console?.log(data)
  }

}
