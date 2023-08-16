import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewBuyerComponent } from './admin-new-buyer.component';

describe('AdminNewBuyerComponent', () => {
  let component: AdminNewBuyerComponent;
  let fixture: ComponentFixture<AdminNewBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewBuyerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
