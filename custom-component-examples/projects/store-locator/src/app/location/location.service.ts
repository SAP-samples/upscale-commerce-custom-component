/**
 * 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { GeoCodeResponse, Address, GoogleGeoResponse, InventoryResponse, LocationResponse } from './location.service.model';
import { environment } from '../../environments/environment';



@Injectable({
	providedIn: 'root'
})
export class LocationService {

	private intermediaryAPIKey = environment.intermediaryApiKey;

	private googleAPIKey = environment.googleApiKey;

	private intermediaryServiceUrl = environment.intermediaryApiRoot;

	constructor(
		private http: HttpClient,
	) {}

	getCoordinatesWithFreeAPI(address: Address): Observable<GeoCodeResponse>{
		const { streetAddress, city, state, zip} = address;
		return this.http.get<GeoCodeResponse>('https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx', {
			params: {
				streetAddress,
				city,
				state,
				zip,
				apiKey: 'demo',
				format: 'json',
				version: '4.01'
			}
		});
	}

	getCoordinatesWithGoogle(address: Address): Observable<GoogleGeoResponse> {
		const url = `https://maps.googleapis.com/maps/api/geocode/json`;
		const { streetAddress, city, state, zip } = address;

		const components = [];

		if (streetAddress) {
			components.push(
				`street_address:` 	+ `${streetAddress.replace(/\s/g, '+')}`
									+ (zip ? `+${zip}` : '')
									+ (state ? `+${state}` : '')
			);
		}
		if (city) {
			components.push(`locality:` + city.replace(/\s/g, '+'));
		}
		const params = {
			components: components.join('|'),
			key: this.googleAPIKey,
		};

		return this.http.get<GoogleGeoResponse>(url, {params});
	}

	addressToString(address: Address): string {
		const { streetAddress, city, state, zip } = address;

		return `${streetAddress.replace(/\s/g, '+')},`
			+ (city ? `, ${city}` : '')
			+ (state ? `, ${state}` : '')
			+ (zip ? `, ${zip}` : '');
	}

	getInventory(id: string): Observable<InventoryResponse> {
		const params = id ? { id } : null;
		const headers = new HttpHeaders({
			'X-API-Key': this.intermediaryAPIKey
		});
		return this.http.get<InventoryResponse>(this.intermediaryServiceUrl + '/inventory', { params, headers });
	}

	getLocations(ids?: Array<string>): Observable<LocationResponse> {
		const params = ids ? { ids} : null;
		const headers = new HttpHeaders({
			'X-API-Key': this.intermediaryAPIKey
		});
		return this.http.get<LocationResponse>(this.intermediaryServiceUrl + '/locations', { params, headers });
	}
}
