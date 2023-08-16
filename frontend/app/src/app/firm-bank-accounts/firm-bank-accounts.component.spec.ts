import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBankAccountsComponent } from './firm-bank-accounts.component';

describe('FirmBankAccountsComponent', () => {
  let component: FirmBankAccountsComponent;
  let fixture: ComponentFixture<FirmBankAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmBankAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmBankAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
