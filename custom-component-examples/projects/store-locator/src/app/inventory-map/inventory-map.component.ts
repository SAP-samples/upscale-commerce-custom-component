import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker, MapGeocoder, MapGeocoderResponse, GoogleMap } from '@angular/google-maps';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';

import { LocationService } from '../location/location.service';
import { ExpandedLocation, GoogleGeoResponse, Inventory, Product } from '../location/location.service.model';

interface ExtendedMarker extends google.maps.Marker {
	info?: {
		storeName?: string,
		storeUrl?: string,
		productAvailability?: number,
		storeAddress?: string
	};
}

// to use Google types

@Component({
	selector: 'app-inventory-map',
	templateUrl: './inventory-map.component.html',
	styleUrls: ['./inventory-map.component.scss']
})
export class InventoryMapComponent {

	@ViewChild(GoogleMap, { static: false }) map: google.maps.Map;
	@ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

	@Input('product')
	set product(product: Product) {
		this._product = product;
		this.markers = [];
		this.getLocationInfo();
	}

	get product(): Product {
		return this._product;
	}

	@Output() sizeChange = new EventEmitter();

	// map configs
	zoom = 12;
	center: google.maps.LatLngLiteral;
	options: google.maps.MapOptions = {
		maxZoom: 15,
		minZoom: 8,
	};

	// marker values
	storeUrl: string;
	markers: Array<ExtendedMarker> = [];
	storeName = '';
	productName = '';
	productAvailability;
	storeAddress = '';
	showMap = false;

	private _product: Product;

	private coordinateMap: {
		[addressString: string]: {
		longitude: number,
		latitude: number,
		formattedAddress: string,
		}
	} = {};

	constructor(
		private geoCoder: MapGeocoder,
		private locationService: LocationService,
	) {}

	zoomIn(): void {
		if (this.zoom < this.options.maxZoom) { this.zoom++; }
	}

	zoomOut(): void {
		if (this.zoom > this.options.minZoom) { this.zoom--; }
	}

	openInfo(marker: MapMarker, storeName, googleMapsUrl, productAvailability, storeAddress): void {
		this.storeName = storeName;
		this.productAvailability = productAvailability;
		this.storeUrl = googleMapsUrl;
		this.productAvailability = productAvailability;
		this.storeAddress = storeAddress;
		this.info.open(marker);
	}

	private setMapCenter(): void {
		navigator.geolocation.getCurrentPosition(
			(position) => {
					this.center = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
				};
			},
			(e) => {
				console.log('Could not pinpoint location: ', e);
				this.center = {
				lat: 42.361145,
				lng: -71.057083
				};
			}
		);
		this.showMap = true;
	}

	private addStoreMarker(
		position: {lat: number, lng: number},
		storeName: string,
		storeUrl: string,
		productAvailability?: number,
		storeAddress?: string
	): void {
		const marker: ExtendedMarker = new google.maps.Marker({
			position,
		});

		marker.info = {
			storeName,
			storeUrl,
			productAvailability,
			storeAddress
		};
		this.markers.push(marker);
	}

	private getLocationInfo(): void {
		this.locationService.getInventory(this.product.id).pipe(
			concatMap(response => this.getQualifyingLocations(response.content[0])),
			concatMap(response => this.getCoordinates(response))
		).subscribe(stores => {
			this.buildStoreMarkers(stores);
			if (!this.showMap) {
				this.setMapCenter();
				this.showMap = true;
				this.sizeChange.emit(500);	// set height to 500px
			}
		}, (e) => {
			console.log('Could not get store info: ', e);
			this.sizeChange.emit(1); // set height to 1px
		});
	}

	private buildStoreMarkers(stores: Array<ExpandedLocation>): void {
		stores.forEach(store => {
		if (store.coordinates) {
			this.addStoreMarker(
			{
				lat: store.coordinates.latitude,
				lng: store.coordinates.longitude
			},
			store.name,
			store.googleMapsUrl,
			store.atp,
			store.addressString,
			);
		}
		});
	}

	/**
	 * Get all locations that have inventory for a product
	 * @param inventory config for a product
	 */
	private getQualifyingLocations(inventory: Inventory): Observable<Array<ExpandedLocation>> {

		const expandedLocations: Array<ExpandedLocation> = [];
		const ids = [];

		if (inventory && inventory.locations) {
			inventory.locations.forEach(loc => {
				expandedLocations.push(loc);
				ids.push(loc.fulfillmentLocationId);
			});
		}

		return this.locationService.getLocations(ids).pipe(
			map(resp => {
				return resp.content.map(location => {
					if (location && location.address) {
						const { state, city, zip } = location.address;
						const matchedLocation = expandedLocations.find(l => l.fulfillmentLocationId === location.fulfillmentLocationId);
						matchedLocation.address = {
							streetAddress: location.address.street || location.address.line1,
							state,
							city,
							zip
						};
						matchedLocation.name = location.name;
						matchedLocation.coordinates = {
							longitude: 0,
							latitude: 0,
						};
						return matchedLocation;
					}
				});
			})
		);
	}

	/**
	 * Get and set coordinates for street addresses of locations
	 * @param locations of locations
	 */
	private getCoordinates(locations: Array<ExpandedLocation>): Observable<ExpandedLocation[]>{
		const requests = locations.filter(l =>	l && l.address).map(l => {
			const address = l.address;
			// incomplete address
			if (!address || !address.streetAddress && !address.city) {
				return of(
					{
						results: [
							{
								geometry: {
									location: {
										lat: 0,
										lng: 0,
									}
								}
							}
						]
					} as GoogleGeoResponse
				);
			}

			const addressString = (address.streetAddress || '').toLowerCase() + address.zip;
			const cachedCoordValue = this.coordinateMap[addressString];

			if (cachedCoordValue) {
				return of(
					{
						status: 'OK',
						results: [
							{
								geometry: {
									location: {
										lat: () => cachedCoordValue.latitude ,
										lng: () => cachedCoordValue.longitude ,
									}
								},
								formatted_address: cachedCoordValue.formattedAddress
							}
						]
					} as MapGeocoderResponse
				);
			}
			return this.geoCoder.geocode({address: this.locationService.addressToString(address)});
		});

		return forkJoin(requests).pipe(
			map(responses => {
				return locations.map((l, index) => {
					if (responses[index].status === 'OK') {
						const addressString = (l.address.streetAddress || '').toLowerCase() + l.address.zip;
						let longitude = null;
						let latitude = null;
						let formattedAddress = null;
						const emptyFunction = () => 0;
						if (responses[index]?.results.length && responses[index]?.results[0]?.geometry?.location) {
							latitude = Number((responses[index]?.results[0].geometry?.location?.lat as () => void || emptyFunction)());
							longitude = Number((responses[index]?.results[0].geometry?.location?.lng as () => void || emptyFunction)());
							formattedAddress = responses[index]?.results[0].formatted_address;
						}

						if (!this.coordinateMap[addressString]) {
							this.coordinateMap[addressString] = { longitude, latitude, formattedAddress };
						}

						l.coordinates.latitude = latitude;
						l.coordinates.longitude = longitude;
						l.addressString = formattedAddress;

						l.googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=' +
						encodeURI(responses[index]?.results[0].formatted_address);
					}
				});
			}),
			mapTo(locations)
		);
	}
}
