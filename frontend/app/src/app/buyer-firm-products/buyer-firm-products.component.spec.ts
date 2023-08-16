import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerFirmProductsComponent } from './buyer-firm-products.component';

describe('BuyerFirmProductsComponent', () => {
  let component: BuyerFirmProductsComponent;
  let fixture: ComponentFixture<BuyerFirmProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerFirmProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerFirmProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
