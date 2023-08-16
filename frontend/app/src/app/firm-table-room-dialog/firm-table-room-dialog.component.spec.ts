import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmTableRoomDialogComponent } from './firm-table-room-dialog.component';

describe('FirmTableRoomDialogComponent', () => {
  let component: FirmTableRoomDialogComponent;
  let fixture: ComponentFixture<FirmTableRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirmTableRoomDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirmTableRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
