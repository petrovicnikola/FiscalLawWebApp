import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmTableMoveDialogComponent } from './firm-table-move-dialog.component';

describe('FirmTableMoveDialogComponent', () => {
  let component: FirmTableMoveDialogComponent;
  let fixture: ComponentFixture<FirmTableMoveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmTableMoveDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmTableMoveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
