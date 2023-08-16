import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmFirstLoginComponent } from './firm-first-login.component';

describe('FirmFirstLoginComponent', () => {
  let component: FirmFirstLoginComponent;
  let fixture: ComponentFixture<FirmFirstLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmFirstLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmFirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
