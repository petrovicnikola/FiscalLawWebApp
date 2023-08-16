import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmProductComponent } from './firm-product.component';

describe('FirmProductComponent', () => {
  let component: FirmProductComponent;
  let fixture: ComponentFixture<FirmProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
