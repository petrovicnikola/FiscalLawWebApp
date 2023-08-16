import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDailyEarningsComponent } from './firm-daily-earnings.component';

describe('FirmDailyEarningsComponent', () => {
  let component: FirmDailyEarningsComponent;
  let fixture: ComponentFixture<FirmDailyEarningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmDailyEarningsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmDailyEarningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
