import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgoliaProductListingComponent } from './algolia-product-listing.component';

describe('AlgoliaProductListingComponent', () => {
  let component: AlgoliaProductListingComponent;
  let fixture: ComponentFixture<AlgoliaProductListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgoliaProductListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgoliaProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
