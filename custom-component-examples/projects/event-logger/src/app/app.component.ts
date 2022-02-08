import { Component } from '@angular/core';
import { environment } from '../environments/environment';

import { UpscaleEvent as UpscaleInputEvent, UpscaleInputEventType } from './input-events.interface';
import { InitializedEvent, SizeEvent } from './output-events.interface';
import { sendMessage } from './send-message.function';


interface EventWrapper {
	timestamp: number;
	oprigin: string;
	data: object;
}

function log(...params: any[]) {
	if (console) console.log('sample custom component', ...params);
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	events: EventWrapper[] = [];

	height = 200;

	product: any;

	isFullSizeIconImageView: boolean = false;

	collapseTrack = {};

	messages = [];

	constructor() {
		window.addEventListener(
			"message",
			event => {
        if(event.origin === environment.storeOrigin) {

          log('recieved', event);

          this.handleEvent(event);
        }
			},
			false
		);
	}

	ngOnInit(): void {
		const event: InitializedEvent = {
			type: "initialized",
			data: null,
		};

		sendMessage(event, environment.storeOrigin);
		this.setSize();
	}

	setSize(): void {
		const event: SizeEvent = {
			type: "sizeChange",
			data: {
				height: this.height
			}
		};

		sendMessage(event, environment.storeOrigin);
	}

	handleEvent(messageEvent: MessageEvent) {
		this.events.push({
			oprigin: messageEvent.origin,
			timestamp: messageEvent.timeStamp,
			data: messageEvent.data,
		});


		const event = messageEvent.data as UpscaleInputEvent;
		log('recieved', event.eventType);

		this.messages.push(`TYPE: ${event.eventType}, DATA: ${JSON.stringify(event.keys)}`)

		switch(event.eventType) {
			case UpscaleInputEventType.LegacyBrowseProductClick:
			case UpscaleInputEventType.BrowseProductClick: {
				console.log('Browse Product clicked. Following information passed: ', event.keys);
				break;
			}
			case UpscaleInputEventType.BrowseProductIconClick: {
				console.log('Browse Product Icon button clicked. Following information passed: ', event.keys);
				break;
			}
			case UpscaleInputEventType.Checkout_address_continue_click: {
				console.log('Checkout Address button clicked. Following information passed: ', event.keys);
				break;
			}
			case UpscaleInputEventType.Checkout_delivery_continue_click: {
				console.log('Checkout Delivery button clicked. Following information passed: ', event.keys);
				break;
			}
			case UpscaleInputEventType.Checkout_payment_continue_click: {
				console.log('Checkout Payment continue button clicked. Following information passed: ', event.keys);
				break;
			}
			case UpscaleInputEventType.Checkout_review_click: {
				console.log('Checkout Review button clicked. Following information passed: ', event.keys);
				break;
			}
			case UpscaleInputEventType.Order_confirmation_component_init: {
				console.log('Order Confirmation initiated. Following information passed: ', event.keys)
			}
		}
	}

}
