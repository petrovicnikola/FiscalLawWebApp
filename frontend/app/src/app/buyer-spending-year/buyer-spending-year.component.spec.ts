import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSpendingYearComponent } from './buyer-spending-year.component';

describe('BuyerSpendingYearComponent', () => {
  let component: BuyerSpendingYearComponent;
  let fixture: ComponentFixture<BuyerSpendingYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSpendingYearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSpendingYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
