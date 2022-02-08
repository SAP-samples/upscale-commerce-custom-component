import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentsComponent } from './dialog-contents.component';

describe('DialogContentsComponent', () => {
  let component: DialogContentsComponent;
  let fixture: ComponentFixture<DialogContentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
