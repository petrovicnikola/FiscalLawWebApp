import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmProductAddToCategoryComponent } from './firm-product-add-to-category.component';

describe('FirmProductAddToCategoryComponent', () => {
  let component: FirmProductAddToCategoryComponent;
  let fixture: ComponentFixture<FirmProductAddToCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmProductAddToCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmProductAddToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
