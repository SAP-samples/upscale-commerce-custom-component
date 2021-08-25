import { Component } from '@angular/core';

import { EmployeeOnlyStoreGuardService } from './employee-only-store-guard.service';

@Component({
  selector: 'lib-employee-only-store-guard',
  templateUrl: './employee-only-store-guard.component.html',
  styleUrls: ['./employee-only-store-guard.component.scss']
})
export class EmployeeOnlyStoreGuardComponent {

  siteAccess: boolean = false;

  accessCalculating: boolean = false;

  constructor(
    employeeService: EmployeeOnlyStoreGuardService
  ) {
    employeeService.userSiteAccess.subscribe(s => this.siteAccess = s);

    employeeService.userSiteAccessCalculating.subscribe(s => this.accessCalculating = s);
  }

}
