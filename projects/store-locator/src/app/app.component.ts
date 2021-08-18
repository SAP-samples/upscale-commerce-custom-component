import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

import { UpscaleEvent as UpscaleInputEvent, UpscaleInputEventType } from './events/input-events.interface';
import { InitializedEvent, SizeEvent } from './events/output-events.interface';
import { sendMessage } from './events/send-message.function';
import { Product } from './location/location.service.model';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	product: Product;

	showInventoryMap: boolean;

	// set to true for localhost, false for deployment. Function: only display if in storefront setting.
	safeToDisplay = false;

	constructor() {
		window.addEventListener(
			'message',
			event => {
				this.handleEvent(event);
			},
			false
		);

		this.showInventoryMap = environment.showInventoryMap;
	}

	ngOnInit(): void {
		this.setInitialized();
		// for local testing
		// this.product = <any>{
		// 	id: '25395504',
		// 	name: 'Some product'
		// }
	}

	setInitialized(): void {
		const event: InitializedEvent = {
			type: 'initialized',
			data: null,
		};

		sendMessage(event);
	}

	setHeight(height: number): void {
		const event: SizeEvent = {
			type: 'sizeChange',
			data: {
				height
			}
		};

		sendMessage(event);
	}

	handleEvent(messageEvent: MessageEvent): void {

		const event = messageEvent.data as UpscaleInputEvent;

		switch (event.eventType) {
			case UpscaleInputEventType.product_detail_component_init: {
				const product = event.keys.product as Product;
				if (product.type !== 'PARENT') {
					this.product = product;
				}
				break;
			}
			case UpscaleInputEventType.product_detail_variant_click: {
				this.product = event.keys.product;
				break;
			}
			case UpscaleInputEventType.component_context: {
				this.safeToDisplay = true;
				break;
			}
		}
	}
}
