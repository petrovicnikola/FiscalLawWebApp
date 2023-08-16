import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmDeleteProductDialogComponent } from './firm-delete-product-dialog.component';

describe('FirmDeleteProductDialogComponent', () => {
  let component: FirmDeleteProductDialogComponent;
  let fixture: ComponentFixture<FirmDeleteProductDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmDeleteProductDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmDeleteProductDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
