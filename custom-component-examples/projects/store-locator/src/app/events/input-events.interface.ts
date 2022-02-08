
export enum UpscaleInputEventType {
	component_context = 'component_context',
	product_detail_variant_click = 'product_detail_variant_click',
	product_detail_component_init = 'product_detail_component_init',
}
/** Event passed from application to custom component */
export interface UpscaleEvent {
	eventType: UpscaleInputEventType;
	keys: {[k: string]: any};
}
