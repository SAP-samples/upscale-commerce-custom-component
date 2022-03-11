import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagePopupComponent } from './page-popup.component';

describe('PagePopupComponent', () => {
  let component: PagePopupComponent;
  let fixture: ComponentFixture<PagePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
