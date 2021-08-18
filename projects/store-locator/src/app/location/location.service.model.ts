/**
 * 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */


export interface Address {
	streetAddress: string;
	city: string;
	state: string;
	zip: string;
}

export interface InventoryResponse {
	content: Array<Inventory>;
	page: {
		size: number,
		totalElements: number,
		totalPages: number,
		number: number,
	};
}

export class Inventory {
	sku: string;
	productId?: string;
	name?: string;
	active?: boolean;
	sellingPrice?: number;
	parentId?: string;
	locations?: {
		/** External fulfillment location id. */
		fulfillmentLocationId: string;
		/** ATP at this location for the particular sku, calculated as per the configured ATP definition. */
		atp: number;
		/** Available quantity. */
		onHand: number;
		/** Quantity in purchase. */
		onOrder: number;
		/** Quantity in transit. */
		inTransit: number;
		/** Quantity in process of being returned. */
		returned: number;
		/** Damaged or non-saleable quantity */
		nonSaleable: number;
		/** Quantity on hold. */
		hold: number;
		/** Quantity being discontinued. */
		discontinued: number;
		/** Inactive quantity */
		inactive: number;
		reserved?: number | string;
		backorderQty: number;
		exceptionQty?: number,
		recommendedQty?: number,
		minOrderQty?: number,
	}[];
	onHand?: number;


	constructor({ sku, productId, onHand, locations, active, name, sellingPrice, parentId }: Partial<Inventory>) {
		this.onHand = onHand;
		this.sku = sku;
		this.productId = productId;
		this.locations = locations;
		this.active = active;
		this.name = name;
		this.sellingPrice = sellingPrice;
		this.parentId = parentId;
	}
}

export interface Location {

	/** External fulfillment location id. */
	fulfillmentLocationId: string;
	/** ATP at this location for the particular sku, calculated as per the configured ATP definition. */
	atp?: number;
	/** Available quantity. */
	onHand?: number;
	/** Quantity in purchase. */
	onOrder?: number;
	/** Quantity in transit. */
	inTransit?: number;
	/** Quantity in process of being returned. */
	returned?: number;
	/** Damaged or non-saleable quantity */
	nonSaleable?: number;
	/** Quantity on hold. */
	hold?: number;
	/** Quantity being discontinued. */
	discontinued?: number;
	/** Inactive quantity */
	inactive?: number;
	reserved?: number | string;
	backorderQty?: number;
	exceptionQty?: number;
	recommendedQty?: number;
	minOrderQty?: number;

	storeType?: string;

}

export interface ExpandedLocation extends Location {

	name?: string;

	address?: Address;

	addressString?: string;

	coordinates?: {
		longitude: number,
		latitude: number
	};

	googleMapsUrl?: string;
}

export interface LocationResponse {
	content: Array<InventoryFulfillmentLocation>;
	page?: {
		size: number,
		totalElements: number,
		totalPages: number,
		number: number,
	};
}


/**
 * Inventory Fulfillment Location item
 */
export interface InventoryFulfillmentLocation {

	/** a flag to identify status of fulfillment location */
	active: boolean;

	address: InventoryFulfillmentLocationAddress;

	/** the friendly identifier of fulfillment location id specified by user */
	fulfillmentLocationId: string;

	/** the unique identifier of fulfillment location */
	id: string;

	/** the friendly identifier of fulfillment location */
	name: string;

	/** the type of fulfillment location */
	type: InventoryLocationType; // TODO: get proper enum ---

	/** the date when fulfillment location was created */
	createdAt: string;

	/** the date when fulfillment location was modified */
	modifiedAt: string;

	/** ID of the fulfillment group this location belongs to */
	parentId?: string;


}


export interface InventoryFulfillmentLocationAddress {
	/** the street address of fulfillment location */
	street: string;

	/** the street address number of fulfillment location */
	streetNumber: string;

	/** the additional lines used to specify closely where is fulfillment location */
	line1: string;

	/** the additional lines used to specify closely where is fulfillment location */
	line2: string;

	/** the additional lines used to specify closely where is fulfillment location */
	line3: string;

	/** the additional lines used to specify closely where is fulfillment location */
	line4: string;

	/** the zip code of fulfillment location address */
	zip: string;

	/** the city of fulfillment location address */
	city: string;

	/** the state of fulfillment location address */
	state: string;

	/** the country code of location address */
	country: string;
}

export enum InventoryLocationType {
	FULFILLMENT_STORE = 'FULFILLMENT_STORE',
	STORE = 'STORE',
	WAREHOUSE = 'WAREHOUSE',
}

export interface GeoCodeResponse {
	QueryStatusCodeValue?: number;
	FeatureMatchingResultType?: string;
	OutputGeocodes: [
		{
			OutputGeocode: {
				Latitude: string
				Longitude: string
			}
		}
	];

}
export interface GoogleGeoResponse {
	results: [
		{
			access_points?: [],
			address_components?: Array<{ long_name: string, short_name: string, types: Array<string> }>,
			formatted_address?: string,
			geometry: {
				location: {
					lat: number
					lng: number
				},
				location_type: string,
				viewport: any
			},
			place_id?: string
			plus_code?: {
				compound_code: string,
				global_code: string
			},
			types?: [string]
		}
	];
	status?: string;
}

export interface VariantAttribute {
	key?: string;
	value?: string;
	swatch?: Swatch;
}

export interface Swatch {
	altText?: string;
	codes?: Array<string>;
	url?: string;
}

export interface Price {
	cogs?: number;
	msrp?: number;
	originalPrice?: number;
	sellingPrice?: number;
	surcharge?: any;
}

export interface Media {
	fullSize?: string;
	swatch?: Swatch;
	thumbnail?: string;
}

export class Product {
	id: string;
	price: Price;
	sku: string;
	type: string;
	name: string;

	active?: boolean;
	customAttributes?: any;
	description?: string;
	media?: Array<Media>;
	metadata?: any;
	parentId?: string;
	position?: any;
	positionOverride?: boolean;
	published?: boolean;
	recurrenceIds?: Array<string>;
	referenceId?: string;
	returnInfo?: any;
	standingOrderConfigurationIds?: Array<string>;
	taxCode?: string;
	variantAttributes?: Array<VariantAttribute>;

	// Expand params
	collectionIds?: Array<string>;
	fulfillmentLocationIds?: Array<string>;
	linkedAttributeSets?: Array<any>;
	productCategoryIds?: Array<string>;
	seo?: any;
	variantSummary?: any;
	addToCartOption?: any;

	constructor(product: Partial<Product>) {
		this.active = product.active;
		this.collectionIds = product.collectionIds;
		this.customAttributes = product.customAttributes;
		this.description = product.description;
		this.fulfillmentLocationIds = product.fulfillmentLocationIds;
		this.id = product.id;
		this.linkedAttributeSets = product.linkedAttributeSets;
		this.media = product.media;
		this.name = product.name;
		this.parentId = product.parentId;
		this.positionOverride = product.positionOverride;
		this.position = product.position;
		this.price = product.price;
		this.productCategoryIds = product.productCategoryIds;
		this.published = product.published;
		this.recurrenceIds = product.recurrenceIds;
		this.referenceId = product.referenceId;
		this.returnInfo = product.returnInfo;
		this.seo = product.seo;
		this.sku = product.sku;
		this.standingOrderConfigurationIds = product.standingOrderConfigurationIds;
		this.taxCode = product.taxCode;
		this.type = 'UNKNOWN';
		this.variantAttributes = product.variantAttributes;
		this.variantSummary = product.variantSummary;
		this.addToCartOption = product.addToCartOption;
	}
}
