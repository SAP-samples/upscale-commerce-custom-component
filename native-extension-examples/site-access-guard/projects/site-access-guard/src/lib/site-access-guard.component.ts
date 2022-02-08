import { Component } from '@angular/core';
import { SiteAccessGuardService } from './site-access-guard.service';

@Component({
  selector: 'lib-site-access-guard',
  templateUrl: './site-access-guard.component.html',
  styleUrls: ['./site-access-guard.component.scss']
})
export class SiteAccessGuardComponent {

  siteAccess: boolean = false;

  accessCalculating: boolean = false;

  constructor(
    siteGuardService: SiteAccessGuardService
  ) {
    siteGuardService.userSiteAccess.subscribe(s => this.siteAccess = s);

    siteGuardService.userSiteAccessCalculating.subscribe(s => this.accessCalculating = s);
  }


}
