import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-dialog-contents',
  templateUrl: './dialog-contents.component.html',
  styleUrls: ['./dialog-contents.component.css']
})
export class DialogContentsComponent {

  modalTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.modalTitle = data.title;
    console.log(data)
  }

}
