import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDailyReportsComponent } from './admin-daily-reports.component';

describe('AdminDailyReportsComponent', () => {
  let component: AdminDailyReportsComponent;
  let fixture: ComponentFixture<AdminDailyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDailyReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDailyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
