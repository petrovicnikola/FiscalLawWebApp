import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewFirmComponent } from './admin-new-firm.component';

describe('AdminNewFirmComponent', () => {
  let component: AdminNewFirmComponent;
  let fixture: ComponentFixture<AdminNewFirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewFirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewFirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
