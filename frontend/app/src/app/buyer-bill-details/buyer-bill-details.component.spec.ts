import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBillDetailsComponent } from './buyer-bill-details.component';

describe('BuyerBillDetailsComponent', () => {
  let component: BuyerBillDetailsComponent;
  let fixture: ComponentFixture<BuyerBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerBillDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
