import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBillProductAmountComponent } from './firm-bill-product-amount.component';

describe('FirmBillProductAmountComponent', () => {
  let component: FirmBillProductAmountComponent;
  let fixture: ComponentFixture<FirmBillProductAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmBillProductAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmBillProductAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
