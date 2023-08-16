import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerBillsComponent } from './buyer-bills.component';

describe('BuyerBillsComponent', () => {
  let component: BuyerBillsComponent;
  let fixture: ComponentFixture<BuyerBillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerBillsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
