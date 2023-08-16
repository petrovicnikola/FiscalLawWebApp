import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerSpendingComponent } from './buyer-spending.component';

describe('BuyerSpendingComponent', () => {
  let component: BuyerSpendingComponent;
  let fixture: ComponentFixture<BuyerSpendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerSpendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerSpendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
