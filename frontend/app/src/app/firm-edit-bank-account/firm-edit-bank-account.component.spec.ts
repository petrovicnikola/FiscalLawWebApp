import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmEditBankAccountComponent } from './firm-edit-bank-account.component';

describe('FirmEditBankAccountComponent', () => {
  let component: FirmEditBankAccountComponent;
  let fixture: ComponentFixture<FirmEditBankAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmEditBankAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmEditBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
