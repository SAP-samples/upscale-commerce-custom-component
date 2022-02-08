import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteAccessGuardComponent } from './site-access-guard.component';

describe('SiteAccessGuardComponent', () => {
  let component: SiteAccessGuardComponent;
  let fixture: ComponentFixture<SiteAccessGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteAccessGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteAccessGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
