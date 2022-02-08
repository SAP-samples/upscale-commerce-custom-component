import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

import { filter } from "rxjs/operators";

export interface IframeMessageConnnection {
	receive: Observable<any>;
	// send(message: Object): void;
}


@Injectable({
  providedIn: 'root'
})
export class RelayedEventReceptorService {

  targetUrl = "https://glass-cream-bird.glitch.me";

  constructor() {
    fromEvent<MessageEvent>(<any>window, 'message')
      .pipe(filter(message => message.origin === this.targetUrl)) // verify origin
      .subscribe(message => console.log("Received event", message)) // print event
    console.log("connection created")
  }
}
