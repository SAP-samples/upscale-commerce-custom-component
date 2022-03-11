import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { OrderLineProductType, Product } from '@upscale/service-client-angular';
import { ShoppingCartService } from '@upscale/web-storefront-sdk';

import algoliasearch from 'algoliasearch/lite';

// velo.city algolia index
const searchClient = algoliasearch(
  'AHP2BQCBJP',
  '196b294e64b31c755a9a928f520d279f'
);

@Component({
  selector: 'lib-algolia-product-listing',
  templateUrl: './algolia-product-listing.component.html',
  styleUrls: ['./algolia-product-listing.component.scss']
})
export class AlgoliaProductListingComponent {

  config = <any>{
		indexName: 'velo-city-en',
		searchClient,
	};

  searchParameters =  { hitsPerPage: 4 };

  constructor(
    private cartService: ShoppingCartService,
    private router: Router
  ) {

  }

  addProduct(product: Product) {
    // console.log("Add product", prod);
    this.cartService.addItems({orderLines: [{product, type: OrderLineProductType.REGULAR, quantity: 1, productOrigin: {}}]}).subscribe()
  }

  viewProduct(product: Product){
    // console.log("View product", prod);
    this.router.navigate(['en-US', "product", product.name, product.id]);
  }

	searchEdit(event: any) {
		if(event.results) {
			console.log(event.results);
		}
	}

}
