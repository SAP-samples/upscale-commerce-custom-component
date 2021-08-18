import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker, MapGeocoder } from '@angular/google-maps';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, map, mapTo } from 'rxjs/operators';

import { LocationService } from '../location/location.service';
import { ExpandedLocation, GoogleGeoResponse } from '../location/location.service.model';

interface ExtendedMarker extends google.maps.Marker {
	info?: {
		storeName?: string,
		storeUrl?: string,
		storeAddress?: string
	};
}

// to use Google types
declare var google: any;

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
	@ViewChild(GoogleMap, { static: false }) map: GoogleMap;
	@ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

	@Output() sizeChange = new EventEmitter();

	zoom = 12;
	center: google.maps.LatLngLiteral;
	options: {
		maxZoom: 15,
		minZoom: 8,
	};
	markers = [];
	storeName = '';
	storeAddress = '';
	storeUrl: string;

	constructor(
		private geoCoder: MapGeocoder,
		private locationService: LocationService,
	) {}

	ngOnInit(): void {
		this.getLocationInfo();
	}

	addStoreMarker(
		position: {lat: number, lng: number},
		storeName: string,
		storeUrl: string,
		storeAddress: string
	): void {
		const marker: ExtendedMarker = new google.maps.Marker({
			position,
		});

		marker.info = {
			storeName,
			storeUrl,
			storeAddress
		};
		this.markers.push(marker);
	}

	openInfo(marker: MapMarker, storeName, googleMapsUrl, storeAddress): void {
		this.storeName = storeName;
		this.storeUrl = googleMapsUrl;
		this.storeAddress = storeAddress;
		this.info.open(marker);
	}

	private createMap(stores: Array<ExpandedLocation>): void {
		navigator.geolocation.getCurrentPosition((position) => {
			this.center = {
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			};
			}, (e) => {
			console.log('Could not pinpoint location: ', e);
			this.center = {
				lat: 42.361145,
				lng: -71.057083
			};
			}
		);

		stores.forEach(store => {
			if (store.coordinates) {
				this.addStoreMarker(
					{
					lat: store.coordinates.latitude,
					lng: store.coordinates.longitude
					},
					store.name,
					store.googleMapsUrl,
					store.addressString
				);
				}
			}
		);
	}

	private getLocationInfo(): void {
		this.locationService.getLocations().pipe(
			concatMap(response => {
				const expandedLocations = response.content.map(location => {
					if (location && location.address) {
						const { state, city, zip } = location.address;
						const expandedLocation: ExpandedLocation = {
							...location,
							address:	{
								streetAddress: location.address.street || location.address.line1,
								state,
								city,
								zip
							},
							coordinates: {
								longitude: 0,
								latitude: 0,
							}
						};
						return expandedLocation;
					}
				});

				return this.getCoordinates(expandedLocations);
			})
		).subscribe(stores => {
			this.createMap(stores);
			this.sizeChange.emit(500);	// set height to 500px
		}, (e) => {
			console.log('Could not get store info: ', e);
			this.sizeChange.emit(1); // set height to 1px
		});
	}

	/**
	 * Get and set coordinates for street addresses of locations
	 * @param locations of locations
	 */
	private getCoordinates(locations: Array<ExpandedLocation>): Observable<Array<ExpandedLocation>> {
		const requests = locations.filter(l =>	l && l.address).map(l => {
			const address = l.address;
			if (!address || !address.streetAddress && !address.city) {
				console.log(l.name, ' has an incomplete address. Setting {0,0} as default coordinates');
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
			return this.geoCoder.geocode({address: this.locationService.addressToString(address)});
		});

		return forkJoin(requests).pipe(
			map(responses => {
				return locations.map((l, index) => {
					if (responses[index].status === 'OK') {

						let longitude = null;
						let latitude = null;
						let formattedAddress = null;

						const emptyFunction = () => 0;
						if (responses[index]?.results.length && responses[index]?.results[0]?.geometry?.location) {
							latitude = Number((responses[index]?.results[0].geometry?.location?.lat as () => void || emptyFunction)());
							longitude = Number((responses[index]?.results[0].geometry?.location?.lng as () => void || emptyFunction)());
							formattedAddress = responses[index]?.results[0].formatted_address;
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
