import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMenuComponent } from './sales-menu.component';

describe('SalesMenuComponent', () => {
  let component: SalesMenuComponent;
  let fixture: ComponentFixture<SalesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesMenuComponent]
    });
    fixture = TestBed.createComponent(SalesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
