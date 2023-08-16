import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmGeneralDataComponent } from './firm-general-data.component';

describe('FirmGeneralDataComponent', () => {
  let component: FirmGeneralDataComponent;
  let fixture: ComponentFixture<FirmGeneralDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmGeneralDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmGeneralDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
