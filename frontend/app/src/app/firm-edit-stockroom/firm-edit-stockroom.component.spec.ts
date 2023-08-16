import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmEditStockroomComponent } from './firm-edit-stockroom.component';

describe('FirmEditStockroomComponent', () => {
  let component: FirmEditStockroomComponent;
  let fixture: ComponentFixture<FirmEditStockroomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmEditStockroomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmEditStockroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
