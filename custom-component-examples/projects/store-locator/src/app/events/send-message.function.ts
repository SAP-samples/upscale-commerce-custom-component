import { OutputEvent } from './output-events.interface';

export function sendMessage(event: OutputEvent, origin = '*'): void {

	// web
	if (window.parent !== window) {
		log('sending web', event);
		window.parent.postMessage(event, origin);
	}

	// android
	else if (((window as any).Android)) {
		log('sending android', event);
		((window as any).Android).sendMessage(JSON.stringify(event));
	}

	// ios
	else if ((window as any).webkit && (window as any).webkit.messageHandlers && (window as any).webkit.messageHandlers.upscaleHandler) {
		log('sending ios', event);
		(window as any).webkit.messageHandlers.upscaleHandler.postMessage(JSON.stringify(event));
	}

	else {
		log('no send method detected');
	}
}


function log(...params: any[]):	void {
	if (console) { console.log('sample custom component', ...params); }
}
