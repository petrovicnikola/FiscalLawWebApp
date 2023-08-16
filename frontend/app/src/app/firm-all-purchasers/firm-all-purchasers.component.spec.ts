import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmAllPurchasersComponent } from './firm-all-purchasers.component';

describe('FirmAllPurchasersComponent', () => {
  let component: FirmAllPurchasersComponent;
  let fixture: ComponentFixture<FirmAllPurchasersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmAllPurchasersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmAllPurchasersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
