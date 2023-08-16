import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmProductCategoryDialogComponent } from './firm-product-category-dialog.component';

describe('FirmProductCategoryDialogComponent', () => {
  let component: FirmProductCategoryDialogComponent;
  let fixture: ComponentFixture<FirmProductCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmProductCategoryDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmProductCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
