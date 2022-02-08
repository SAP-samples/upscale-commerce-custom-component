
export enum UpscaleInputEventType {
	LegacyBrowseProductClick = 'browse.product.click',
	BrowseProductClick = 'browse_product_click',
	BrowseProductIconClick = 'browse_product_icon_click',
	Checkout_address_continue_click = 'checkout_address_continue_click',
	Checkout_delivery_continue_click = 'checkout_delivery_continue_click',
	Checkout_payment_continue_click = 'checkout_payment_continue_click',
	Checkout_review_click = 'checkout_review_click',
	Order_confirmation_component_init = 'order_confirmation_component_init',
}

/** Event passed from application to custom component */
export interface UpscaleEvent {
	eventType: UpscaleInputEventType;
	keys: {[k: string]: any};
}
