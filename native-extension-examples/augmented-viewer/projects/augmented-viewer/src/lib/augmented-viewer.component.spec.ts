import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AugmentedViewerComponent } from './augmented-viewer.component';

describe('AugmentedViewerComponent', () => {
  let component: AugmentedViewerComponent;
  let fixture: ComponentFixture<AugmentedViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AugmentedViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AugmentedViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
