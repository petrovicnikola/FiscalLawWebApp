import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBillPayoutComponent } from './firm-bill-payout.component';

describe('FirmBillPayoutComponent', () => {
  let component: FirmBillPayoutComponent;
  let fixture: ComponentFixture<FirmBillPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmBillPayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmBillPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
