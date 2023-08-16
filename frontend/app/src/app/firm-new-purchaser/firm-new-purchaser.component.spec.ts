import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmNewPurchaserComponent } from './firm-new-purchaser.component';

describe('FirmNewPurchaserComponent', () => {
  let component: FirmNewPurchaserComponent;
  let fixture: ComponentFixture<FirmNewPurchaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmNewPurchaserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmNewPurchaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
