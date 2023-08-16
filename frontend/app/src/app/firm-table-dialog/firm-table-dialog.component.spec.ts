import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmTableDialogComponent } from './firm-table-dialog.component';

describe('FirmTableDialogComponent', () => {
  let component: FirmTableDialogComponent;
  let fixture: ComponentFixture<FirmTableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmTableDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmTableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
