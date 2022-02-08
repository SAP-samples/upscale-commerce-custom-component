import { Component, OnInit } from '@angular/core';
import { AugmentedViewerService } from './augmented-viewer.service';

@Component({
  selector: 'lib-augmented-viewer',
  template: `<div id="viewerContainer" style="width:100%;height:800px"></div>`,
  styles: []
})
export class AugmentedViewerComponent implements OnInit {

  constructor(
    private augmentedViewerService: AugmentedViewerService
  ) {

  }

  ngOnInit(): void {
    this.augmentedViewerService.load('expiviScript').then(data => {
      console.log('script loaded ', 'loading expivi component');
      this.addExpiviEventListener();
    }).catch(error => console.log(error));
  }

  addExpiviEventListener() {
		const initializationFunction = () => {
			console.log("LOAD", document.getElementById('viewerContainer'));
			let productId = 8606;
			let Token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImRkZmFhM2ExNTU0ZWQ4MmMxZmNlMmNjYzMzZWRmYTA3ZTY1NjdkNGUwZjU0MjA2MDM4ZDFiMzhkNjY0NWEzMzEwMmQzNWY3ODY2Yzc2YmNkIn0.eyJhdWQiOiIxIiwianRpIjoiZGRmYWEzYTE1NTRlZDgyYzFmY2UyY2NjMzNlZGZhMDdlNjU2N2Q0ZTBmNTQyMDYwMzhkMWIzOGQ2NjQ1YTMzMTAyZDM1Zjc4NjZjNzZiY2QiLCJpYXQiOjE1ODY4ODYxMzEsIm5iZiI6MTU4Njg4NjEzMSwiZXhwIjoxOTAyNDE4OTMxLCJzdWIiOiIxMTgwIiwic2NvcGVzIjpbXX0.HMT8Z4ctDYtWdiSqQpAd3oQa8bXOb89Q249RiScL5oiyQJLiS8rrY0vDaesT-v8zHmpGVK7C3gqPJSzLsVfI2PdnDiFM1eq7n-euEJQyDS5CW8szyzKw3MB_pkoZGSWoWmgQD5n4frJTBtRoeGbisaWN_m5ZOS-nRQPMMyxB1FxbzqD-BUs3qyuX_MyTFD_t-dc2vD3L_Mp1OYm7NJJCQRQ7Yi3pWJz899k7C7vB-fdknRZjVgpjARJ0z499rAZ1UgUp8gAJIFluD-UFSDA5-Px2s-MoDMjymR8tMvP-0LhLT5tT2ldtNyI4jcF_57-ia_10Of36afLbC1PfWEjqdm9Uj_0pYQnesYzDoOXy8nGzMYjb4zBI5g-6Qz4CR3fLmGMeB6pBGP4idE6AbC2HqzS4VrbnUUd36Z7JJVWOSrTlbALIq15dmNucTOY4ukSYm7eRFwcUeaKoPBTz-lQaXxgivNwRDirFUsYlWhxmkfoeN6mEan7OYFl0f_blEwc_hu6hAb2LQVeegvVUss9HzWk77IczLwgWm2mhDMmAVBvo6VRAleIzpQCUzLbkMArcOqsF_gW1ldDOZg03yhxjebgEPEacAmVRCTvppjdv_asNgPJlJxrFD6QHB2F4VuCdVO1nbrsYaXt8CmpI1X_Nyk6_TTQNWVp9TiRCVGMQWFc";

			window['expivi']._create(
				Token,
				productId,
				"#viewerContainer", {
					show360Indicator: true,
					showProgress: true,
					blockDefaultTouch: false,
					showRootNavigation: true,
				}
			);

			/**
			wait until expivi is ready to communicate with
			**/
			window['expivi']._events.onReady.subscribe(function(){
				window['expivi'].setProductAttributeNamed("Player Name", "Klein");
				window['expivi'].setProductAttributeNamed("Player Number", "99");
				/**
				Tell expivi we are ready to receive events
				**/
				window['expivi']._dispatch("client_ready").then(function(){
				});
			});
		}

		if(document.getElementById('viewerContainer')) {
			initializationFunction();
		} else {
			window.addEventListener('load', function () {
				initializationFunction();
			});
		}
	}

}
