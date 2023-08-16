import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBillReportComponent } from './firm-bill-report.component';

describe('FirmBillReportComponent', () => {
  let component: FirmBillReportComponent;
  let fixture: ComponentFixture<FirmBillReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmBillReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmBillReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
