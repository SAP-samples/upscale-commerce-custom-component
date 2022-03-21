
interface AndroidWindow extends Window {
  Android: {
    sendMessage(data);
  }
}

interface IosWindow extends Window  {
  webkit: {
    messageHandlers: {
      upscaleHandler: {
        postMessage(data);
      }
    }
  }
}


/**
 * Utility method to send an event from a custom component to a hosting Upscale application.
 *
 *
 * This method automatically tests for platform (ios/android/web) and sends the message
 * to the appropriate handler.
 *
 * @param origin Origin to send the message to.  This should be the expected host application's origin.
 */
export function sendMessage(window: Window | AndroidWindow | IosWindow, origin: string, event: object) {
  // web
  if (window.parent !== window) {
    window.parent.postMessage(event, origin);
  }
  // android
  else if ('Android' in window) {
    window.Android.sendMessage(JSON.stringify(event));
  }
  // ios
  else if (
    'webkit' in window &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.upscaleHandler
  ) {
    window.webkit.messageHandlers.upscaleHandler.postMessage(
      JSON.stringify(event)
    );
  } else {
    console.log("no send method detected");
  }
}
