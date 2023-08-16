import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmUpdateProductComponent } from './firm-update-product.component';

describe('FirmUpdateProductComponent', () => {
  let component: FirmUpdateProductComponent;
  let fixture: ComponentFixture<FirmUpdateProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmUpdateProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
