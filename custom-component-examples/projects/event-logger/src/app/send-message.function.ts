import { OutputEvent } from './output-events.interface';

export function sendMessage(event: OutputEvent, origin = "*") {

	// web
	if (window.parent !== window) {
		log('sending web', event);
		window.parent.postMessage(event, origin);
	}

	// android
	else if (((<any>window).Android)) {
		log('sending android', event);
		((<any>window).Android).sendMessage(JSON.stringify(event));
	}

	// ios
	else if ((<any>window).webkit && (<any>window).webkit.messageHandlers && (<any>window).webkit.messageHandlers.upscaleHandler) {
		log('sending ios', event);
		(<any>window).webkit.messageHandlers.upscaleHandler.postMessage(JSON.stringify(event));
	}

	else {
		log('no send method detected');
	}
}


function log(...params: any[]) {
	if (console) console.log('sample custom component', ...params);
}
