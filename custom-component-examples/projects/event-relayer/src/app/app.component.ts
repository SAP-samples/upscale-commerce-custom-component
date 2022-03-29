import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { sendMessage } from './send-message.function';

@Component({
  selector: 'app-root',
  template: '',
  styles: [''],
})
export class AppComponent implements OnInit {

  /**
   * Set to expected origin of hosting application
   */
  expectedOrigin = 'http://localhost:4200';

  events: object[] = [];

  ngOnInit(): void {

    window.addEventListener(
      'message',
      (event) => {
        if(event.origin === this.expectedOrigin) {
          if (!environment.production) {
            // for debugging or learning
            this.events.push(event.data);
            console.log('relaying an event', event);
          }
          sendMessage(window, this.expectedOrigin, { type: 'relay', data: event.data });
        }
      },
      false
    );

    this.sendStartupEvents();
  }

  /**
   * Required startup events to notify the consumer app of readiness and preferred conntainer size
   */
  private sendStartupEvents() {
    // let host know application is running and ready
    let initEvent = { type: 'initialized', data: null };
    sendMessage(window, this.expectedOrigin, initEvent);

    // this item is a data relay with no UI, set height to 0
    let sizeEvent = { type: 'sizeChange', data: { height: 0 } };
    sendMessage(window, this.expectedOrigin, sizeEvent);
  }
}
