import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmProductPriceComponent } from './firm-product-price.component';

describe('FirmProductPriceComponent', () => {
  let component: FirmProductPriceComponent;
  let fixture: ComponentFixture<FirmProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmProductPriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
