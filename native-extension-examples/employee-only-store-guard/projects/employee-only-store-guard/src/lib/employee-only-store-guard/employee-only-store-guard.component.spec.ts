import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnlyStoreGuardComponent } from './employee-only-store-guard.component';

describe('EmployeeOnlyStoreGuardComponent', () => {
  let component: EmployeeOnlyStoreGuardComponent;
  let fixture: ComponentFixture<EmployeeOnlyStoreGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeOnlyStoreGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOnlyStoreGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
