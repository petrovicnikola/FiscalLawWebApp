import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmBillTableDialogComponent } from './firm-bill-table-dialog.component';

describe('FirmBillTableDialogComponent', () => {
  let component: FirmBillTableDialogComponent;
  let fixture: ComponentFixture<FirmBillTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmBillTableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmBillTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
