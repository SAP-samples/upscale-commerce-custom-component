import { Component } from "@angular/core";
import { RelayedEventReceptorService } from "./relayed-event-receptor.service";

@Component({
  selector: 'lib-relayed-event-receptor',
  templateUrl: './relayed-event-receptor.component.html',
  styleUrls: ['./relayed-event-receptor.component.scss']
})
export class RelayedEventReceptorComponent {
  customComponentEvents: Array<string> = [];

  constructor(private relayedEventReceptorService: RelayedEventReceptorService) {
    this.relayedEventReceptorService.customComponentEventStream.subscribe(event => {
      this.customComponentEvents.push(JSON.stringify(event.data, null, 4));
    });
  }
}
