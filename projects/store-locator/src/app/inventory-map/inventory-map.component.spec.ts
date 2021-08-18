import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMapComponent } from './inventory-map.component';

describe('InventoryMapComponent', () => {
	let component: InventoryMapComponent;
	let fixture: ComponentFixture<InventoryMapComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
		declarations: [ InventoryMapComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InventoryMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
