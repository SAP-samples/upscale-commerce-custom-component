import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { InventoryMapComponent } from './inventory-map/inventory-map.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		InventoryMapComponent,
	],
	imports: [
		BrowserModule,
		GoogleMapsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
