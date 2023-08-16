import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmStockroomsCashRegistersComponent } from './firm-stockrooms-cash-registers.component';

describe('FirmStockroomsCashRegistersComponent', () => {
  let component: FirmStockroomsCashRegistersComponent;
  let fixture: ComponentFixture<FirmStockroomsCashRegistersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmStockroomsCashRegistersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmStockroomsCashRegistersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
