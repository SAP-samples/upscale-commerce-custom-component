import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { AttributeSetResourceType, AttributeSetService, AttributeSetValue, CustomerService } from "@caas/service-client-angular";
import { AuthenticationService } from "@upscale/web-storefront-sdk";
import { BehaviorSubject } from "rxjs";
import { concatMap, filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeOnlyStoreGuardService {
  private isLoggedIn: boolean;

  private siteAccess = false;

  private activeQuery = false;

  private asv: AttributeSetValue;

  private attributeSetCode = "57f409e8-d6a9-4059-adda-9b67c8ef167c";

  private generalEmployeeStatusValueCode = "08b33614-a010-48f6-b29d-c19718ad3fa5";

  private statusAttributeCode = "3f6e9c9d-6403-4652-8c36-79f47fd58270";

  userSiteAccess: BehaviorSubject<boolean> = new BehaviorSubject(false);

  userSiteAccessCalculating: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private attributeSetService: AttributeSetService,
    private consumerService: CustomerService,
  ) {

    this.authenticationService.authentication.subscribe(auth => {
      this.isLoggedIn = !!auth.authToken;

      if (this.isLoggedIn) {
        if(!this.activeQuery && !this.asv) {
          this.userSiteAccessCalculating.next(true);
          this.activeQuery = true;
          setTimeout(() =>
            {
              this.fetchStatus();
            },
            3000);
        }
      } else {
        this.userSiteAccess.next(false);
      }

    });

    this.router.events.pipe(
      filter(ev => ev instanceof NavigationStart)
    ).subscribe((ev: NavigationStart) => {
      this.evaluateAndApplyRedirect(ev);
    })
  }

  evaluateAndApplyRedirect(ev: NavigationStart) {
    console.log(this.isLoggedIn, this.siteAccess, this.activeQuery)
    if(ev.url.includes('account') || ev.url.includes('login')){
      console.log("case 1")
      return;
    } else if(this.isLoggedIn && this.siteAccess) {
      console.log("case 2")
      return
    } else if(this.activeQuery) {
      console.log("case 3")
      return
    } else {
      console.log("rejected: case 4")
      this.router.navigate(['/en-US/','account']);
    }
  }

  fetchStatus() {
    this.consumerService.getCustomerInfo().pipe(
      concatMap(cust => this.attributeSetService.getAttributeSetValues(this.attributeSetCode, cust.id, AttributeSetResourceType.SAP_CUSTOMER))
    ).subscribe(asv => {
      this.activeQuery = false;
      this.userSiteAccessCalculating.next(false);
      this.asv = asv;
      if(asv?.resourceTypes[0]?.attributeSetValues[0][this.statusAttributeCode].includes(this.generalEmployeeStatusValueCode)) {
        console.log("ACCESS GRANTED")
        this.isLoggedIn = true;
        this.siteAccess = true;
        this.userSiteAccess.next(true)
      } else {
        console.log("ACCESS DENIED")
        this.siteAccess = false;
        this.userSiteAccess.next(false)
      }
    })
  }

}
