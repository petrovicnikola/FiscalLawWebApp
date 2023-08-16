import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmProductCreateCategoryComponent } from './firm-product-create-category.component';

describe('FirmProductCreateCategoryComponent', () => {
  let component: FirmProductCreateCategoryComponent;
  let fixture: ComponentFixture<FirmProductCreateCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmProductCreateCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmProductCreateCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
