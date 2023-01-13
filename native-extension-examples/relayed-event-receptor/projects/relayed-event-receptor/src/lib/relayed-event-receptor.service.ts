import { Injectable } from '@angular/core';
import { fromEvent, Observable, ReplaySubject } from 'rxjs';

import { filter, shareReplay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RelayedEventReceptorService {

  private targetUrl = "https://glass-cream-bird.glitch.me";
  private customComponentEventSubject: ReplaySubject<MessageEvent> = new ReplaySubject<MessageEvent>(1);

  customComponentEventStream = this.customComponentEventSubject.asObservable();

  constructor() {
    if (window.addEventListener && window.removeEventListener) {
      fromEvent<MessageEvent>(<any>window, 'message')
        .pipe(filter(message => message.origin === this.targetUrl)).subscribe(event => {
          this.customComponentEventSubject.next(event);
        });
      }
    }
}
